module.exports = {
  apps: [
    {
      name: 'canadian-api',
      script: '/var/www/canadian-lawn/.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/backend start',
      cwd: '/var/www/canadian-lawn',
      watch: false,
      error_file: '/var/www/canadian-lawn/logs/canadian-api-error.log',
      out_file: '/var/www/canadian-lawn/logs/canadian-api-out.log',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'canadian-web',
      script: '/var/www/canadian-lawn/.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/web start',
      cwd: '/var/www/canadian-lawn',
      watch: false,
      error_file: '/var/www/canadian-lawn/logs/canadian-web-error.log',
      out_file: '/var/www/canadian-lawn/logs/canadian-web-out.log',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
