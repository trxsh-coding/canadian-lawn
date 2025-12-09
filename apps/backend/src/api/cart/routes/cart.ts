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
  ],
};
