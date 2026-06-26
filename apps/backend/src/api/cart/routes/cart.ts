export default {
  routes: [
    {
      method: 'POST',
      path: '/cart',
      handler: 'cart.createCart',
    },

    {
      method: 'GET',
      path: '/cart',
      handler: 'cart.me',
    },
    {
      method: 'PATCH',
      path: '/cart/merge',
      handler: 'cart.merge',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/cart/items',
      handler: 'cart.addItem',
    },
    {
      method: 'PATCH',
      path: '/cart/items/:itemId',
      handler: 'cart.updateItem',
    },
    {
      method: 'DELETE',
      path: '/cart/items/:itemId',
      handler: 'cart.removeItem',
    },
  ],
};
