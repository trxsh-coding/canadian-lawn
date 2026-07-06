import axios from 'axios';
import { v4 as uuid } from 'uuid';

const resolveCheckoutUser = async (ctx) => {
  if (ctx.state.user) return ctx.state.user;

  const authHeader = ctx.request.headers['authorization'] as string | undefined;
  if (!authHeader?.startsWith('Bearer ')) return undefined;

  try {
    const jwtService = strapi.plugins['users-permissions'].services.jwt;
    const decoded = await jwtService.verify(authHeader.slice(7));
    return await strapi.entityService.findOne('plugin::users-permissions.user', decoded.id);
  } catch {
    // Invalid/expired token — treat as guest
    return undefined;
  }
};

const notifyTelegram = async (message: string) => {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const telegramThreadId = process.env.TELEGRAM_ORDER_THREAD_ID;

  if (!telegramToken || !telegramChatId) return;

  try {
    await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      chat_id: telegramChatId,
      text: message,
      parse_mode: 'Markdown',
      ...(telegramThreadId ? { message_thread_id: Number(telegramThreadId) } : {}),
    });
  } catch (e) {
    strapi.log.error('Telegram notification failed:', e);
  }
};

const notifyOrderEmail = async (orderId: number, html: string) => {
  const notifyEmail = process.env.ORDER_NOTIFY_EMAIL;

  if (!notifyEmail) return;

  try {
    await strapi.plugins['email'].services.email.send({
      to: notifyEmail,
      subject: `Новый заказ #${orderId}`,
      html,
    });
  } catch (e) {
    strapi.log.error('Order notification email failed:', e);
  }
};

export default {
  async createCart(ctx) {
    const { uuid: clientUUID } = ctx.request.params;

    const cart = await strapi.entityService.create('api::cart.cart', {
      data: {
        uuid: clientUUID ?? uuid(),
        cart_status: 'active',
      },
    });

    return cart;
  },

  async getCart(ctx) {
    const { uuid: clientUUID } = ctx.request.body;

    return await strapi.db.query('api::cart.cart').findOne({
      where: { uuid: clientUUID, cart_status: 'active' },
      populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
    });
  },

  async merge(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('User must be authenticated to merge cart');
    }

    const { items: guestItems } = ctx.request.body;

    if (!guestItems || !Array.isArray(guestItems)) {
      return ctx.badRequest('guest items missing');
    }

    let userCart = await strapi.db.query('api::cart.cart').findOne({
      where: { users_permissions_user: user.id, cart_status: 'active' },
      populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
    });

    if (!userCart) {
      userCart = await strapi.entityService.create('api::cart.cart', {
        data: {
          users_permissions_user: user.id,
          cart_status: 'active',
        },
      });
      userCart.cart_items = [];
    }

    for (const guestItem of guestItems) {
      const existing = userCart.cart_items.find(
        (item) =>
          item.product.id === guestItem.productId &&
          (item.package_weight ?? null) === (guestItem.packageWeight ?? null)
      );

      if (existing) {
        await strapi.entityService.update('api::cart-item.cart-item', existing.id, {
          data: {
            quantity: existing.quantity + guestItem.quantity,
          },
        });
      } else {
        await strapi.entityService.create('api::cart-item.cart-item', {
          data: {
            cart: userCart.id,
            product: guestItem.productId,
            quantity: guestItem.quantity,
            price: guestItem.price,
            package_weight: guestItem.packageWeight ?? null,
            package_unit: guestItem.packageUnit ?? null,
          },
        });
      }
    }

    const updatedCart = await strapi.db.query('api::cart.cart').findOne({
      where: { id: userCart.id },
      populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
    });

    return updatedCart;
  },

  async me(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized('Not authenticated');

    let cart = await strapi.db.query('api::cart.cart').findOne({
      where: { users_permissions_user: user.id, cart_status: 'active' },
      populate: [
        'cart_items',
        'cart_items.product',
        'cart_items.product.images',
        'cart_items.product.image',
      ],
    });

    if (!cart) {
      cart = await strapi.entityService.create('api::cart.cart', {
        data: {
          users_permissions_user: user.id,
          cart_status: 'active',
        },
        populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
      });
    }

    return cart;
  },

  async myOrders(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized('Not authenticated');

    return await strapi.db.query('api::cart.cart').findMany({
      where: { users_permissions_user: user.id, cart_status: 'ordered' },
      populate: [
        'cart_items',
        'cart_items.product',
        'cart_items.product.images',
        'cart_items.product.image',
      ],
      orderBy: { ordered_at: 'desc' },
    });
  },

  async addItem(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized('Not authenticated');

    const { productId, quantity, price, packageWeight, packageUnit } = ctx.request.body;

    if (!productId || !quantity || !price) {
      return ctx.badRequest('productId, quantity and price are required');
    }

    // Get or create cart
    let cart = await strapi.db.query('api::cart.cart').findOne({
      where: { users_permissions_user: user.id, cart_status: 'active' },
      populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
    });

    if (!cart) {
      cart = await strapi.entityService.create('api::cart.cart', {
        data: {
          users_permissions_user: user.id,
          cart_status: 'active',
        },
      });
      cart.cart_items = [];
    }

    const existingItem = cart.cart_items.find(
      (item) =>
        item.product.id === productId && (item.package_weight ?? null) === (packageWeight ?? null)
    );

    if (existingItem) {
      await strapi.entityService.update('api::cart-item.cart-item', existingItem.id, {
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      await strapi.entityService.create('api::cart-item.cart-item', {
        data: {
          cart: cart.documentId,
          product: productId,
          quantity,
          price,
          package_weight: packageWeight ?? null,
          package_unit: packageUnit ?? null,
        },
      });
    }

    const updatedCart = await strapi.db.query('api::cart.cart').findOne({
      where: { id: cart.id },
      populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
    });

    return updatedCart;
  },

  async updateItem(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized('Not authenticated');

    const { itemId } = ctx.params;
    const { quantity } = ctx.request.body;

    if (!quantity || quantity < 0) {
      return ctx.badRequest('Valid quantity is required');
    }

    // Get cart item
    const cartItem = await strapi.db.query('api::cart-item.cart-item').findOne({
      where: { id: itemId },
      populate: ['cart', 'cart.users_permissions_user'],
    });

    if (!cartItem) {
      return ctx.notFound('Cart item not found');
    }

    // Check ownership
    if (cartItem.cart.users_permissions_user.id !== user.id) {
      return ctx.forbidden('You can only update your own cart items');
    }

    if (quantity === 0) {
      // Delete item if quantity is 0
      await strapi.entityService.delete('api::cart-item.cart-item', itemId);
    } else {
      // Update quantity
      await strapi.entityService.update('api::cart-item.cart-item', itemId, {
        data: { quantity },
      });
    }

    // Return updated cart
    const updatedCart = await strapi.db.query('api::cart.cart').findOne({
      where: { id: cartItem.cart.id },
      populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
    });

    return updatedCart;
  },

  async removeItem(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized('Not authenticated');

    const { itemId } = ctx.params;

    // Get cart item
    const cartItem = await strapi.db.query('api::cart-item.cart-item').findOne({
      where: { id: itemId },
      populate: ['cart', 'cart.users_permissions_user'],
    });

    if (!cartItem) {
      return ctx.notFound('Cart item not found');
    }

    // Check ownership
    if (cartItem.cart.users_permissions_user.id !== user.id) {
      return ctx.forbidden('You can only delete your own cart items');
    }

    // Delete item
    await strapi.entityService.delete('api::cart-item.cart-item', itemId);

    // Return updated cart
    const updatedCart = await strapi.db.query('api::cart.cart').findOne({
      where: { id: cartItem.cart.id },
      populate: ['cart_items', 'cart_items.product', 'cart_items.product.images'],
    });

    return updatedCart;
  },

  async checkout(ctx) {
    // Route has auth:false so ctx.state.user is always undefined.
    const user = await resolveCheckoutUser(ctx);

    const {
      name,
      surname,
      patronymic,
      phone,
      email,
      comment,
      paymentType,
      address,
      deliveryType,
      items: guestItems,
    } = ctx.request.body;

    if (!name || !phone) {
      return ctx.badRequest('name and phone are required');
    }

    const orderData = {
      cart_status: 'ordered' as const,
      order_status: 'new' as const,
      ordered_at: new Date(),
      order_name: name,
      order_surname: surname,
      order_patronymic: patronymic ?? null,
      order_phone: phone,
      order_email: email ?? null,
      order_comment: comment ?? null,
      payment_type: paymentType ?? null,
      delivery_type: deliveryType ?? null,
      delivery_address: address ?? null,
    };

    let cart;

    if (user) {
      cart = await strapi.db.query('api::cart.cart').findOne({
        where: { users_permissions_user: user.id, cart_status: 'active' },
        populate: ['cart_items', 'cart_items.product'],
      });

      if (!cart || !cart.cart_items?.length) {
        return ctx.badRequest('No active cart found');
      }

      await strapi.entityService.update('api::cart.cart', cart.id, {
        data: orderData,
      });
    } else {
      if (!guestItems?.length) {
        return ctx.badRequest('Guest items are required');
      }

      cart = await strapi.entityService.create('api::cart.cart', {
        data: orderData,
      });

      for (const item of guestItems) {
        await strapi.entityService.create('api::cart-item.cart-item', {
          data: {
            cart: cart.id,
            product: item.productId,
            quantity: item.quantity,
            price: item.price,
            package_weight: item.packageWeight ?? null,
            package_unit: item.packageUnit ?? null,
          },
        });
      }

      cart = await strapi.db.query('api::cart.cart').findOne({
        where: { id: cart.id },
        populate: ['cart_items', 'cart_items.product'],
      });
    }

    const cartItems = cart.cart_items ?? [];
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsList = cartItems
      .map((item) => {
        const variant = item.package_weight
          ? ` (${item.package_weight} ${item.package_unit ?? 'кг'})`
          : '';
        return `• ${item.product?.name ?? '—'}${variant} ×${item.quantity} — ${item.price * item.quantity} ₽`;
      })
      .join('\n');

    const deliveryLabels: Record<string, string> = {
      russia: `Доставка по России${address ? `: ${address}` : ''}`,
      courier: `Курьер по Москве и Подмосковью${address ? `: ${address}` : ''}`,
      pickup: 'Самовывоз',
    };
    const delivery = deliveryLabels[deliveryType] ?? 'Самовывоз';
    const payment = paymentType === 'invoice' ? 'Счёт фактура' : 'Онлайн оплата СБП, Картой, QR';
    const fullName = [surname, name, patronymic].filter(Boolean).join(' ');

    const message =
      `🛒 *Новый заказ #${cart.id}*\n\n` +
      `👤 ${fullName}\n` +
      `📞 ${phone}\n` +
      `📧 ${email ?? '—'}\n` +
      `💳 ${payment}\n` +
      `🚚 ${delivery}\n` +
      (comment ? `💬 ${comment}\n` : '') +
      `\n${itemsList}\n\n` +
      `💰 *Итого: ${total} ₽*`;

    await notifyTelegram(message);

    const itemsListHtml = cartItems
      .map((item) => {
        const variant = item.package_weight
          ? ` (${item.package_weight} ${item.package_unit ?? 'кг'})`
          : '';
        return `<li>${item.product?.name ?? '—'}${variant} ×${item.quantity} — ${item.price * item.quantity} ₽</li>`;
      })
      .join('');

    await notifyOrderEmail(
      cart.id,
      `<p>Сформирован новый заказ #${cart.id}</p>` +
        `<p>Покупатель: ${fullName}<br/>Телефон: ${phone}<br/>Email: ${email ?? '—'}<br/>Оплата: ${payment}<br/>${delivery}${comment ? `<br/>Комментарий: ${comment}` : ''}</p>` +
        `<ul>${itemsListHtml}</ul>` +
        `<p><strong>Итого: ${total} ₽</strong></p>`
    );

    return { success: true, orderId: cart.id };
  },
};
