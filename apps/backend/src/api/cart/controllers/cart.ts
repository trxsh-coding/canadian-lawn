import { v4 as uuid } from 'uuid';

export default {
  async createCart(ctx) {
    const { uuid: clientUUID } = ctx.request.params;

    const cart = await strapi.entityService.create('api::cart.cart', {
      data: {
        uuid: clientUUID ?? uuid(),
        status: 'active',
      },
    });

    return cart;
  },

  async getCart(ctx) {
    const { uuid: clientUUID } = ctx.request.body;

    return await strapi.db.query('api::cart.cart').findOne({
      where: { uuid: clientUUID, status: 'active' },
      populate: ['items', 'items.product'],
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
      populate: ['cart_items', 'cart_items.product'],
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
      populate: ['cart_items', 'cart_items.product'],
    });

    return updatedCart;
  },

  async me(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized('Not authenticated');

    let cart = await strapi.db.query('api::cart.cart').findOne({
      where: { user: user.id },
      populate: ['cart_items', 'cart_items.product'],
    });

    if (!cart) {
      cart = await strapi.entityService.create('api::cart.cart', {
        data: {
          users_permissions_user: user.id,
          items: [],
        },
        populate: ['cart_items', 'cart_items.product'],
      });
    }

    return cart;
  },
};
