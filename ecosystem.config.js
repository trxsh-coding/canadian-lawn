module.exports = {
  apps: [
    {
      name: 'canadian-web',
      script: 'yarn',
      args: 'serve:web',
      cwd: '/var/www/canadian-lawn',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'canadian-api',
      script: 'yarn',
      args: 'serve:backend',
      cwd: '/var/www/canadian-lawn',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
