export default {
  routes: [
    {
      method: 'GET',
      path: '/filters',
      handler: 'filters.getFilters',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
