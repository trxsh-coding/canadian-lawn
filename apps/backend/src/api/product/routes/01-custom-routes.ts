export default {
  routes: [
    {
      method: 'GET',
      path: '/product/getBySlug/:slug',
      handler: 'api::product.product.findOneBySlug',
    },
  ],
};
