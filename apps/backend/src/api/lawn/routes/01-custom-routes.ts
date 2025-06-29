export default [
  {
    method: 'GET',
    path: '/lawn/getBySlug/:slug',
    handler: 'api::lawn.lawn.findOneBySlug',
  },
];
