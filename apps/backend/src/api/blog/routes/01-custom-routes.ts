export default [
  {
    method: 'GET',
    path: '/blog/getBySlug/:slug',
    handler: 'api::blog.blog.findOneBySlug',
  },
];
