module.exports = {
  apps: [
    {
      name: 'canadian-api',
      script: '/var/www/canadian-lawn/.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/backend start',
      cwd: '/var/www/canadian-lawn',
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
