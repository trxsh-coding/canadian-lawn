import { v4 as uuid } from 'uuid';

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
      const existing = userCart.cart_items.find((item) => item.product.id === guestItem.productId);

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

  async addItem(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized('Not authenticated');

    const { productId, quantity, price } = ctx.request.body;

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

    const existingItem = cart.cart_items.find((item) => item.product.id === productId);

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
};
