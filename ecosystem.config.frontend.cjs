module.exports = {
  apps: [
    {
      name: 'canadian-web',
      script: '/var/www/canadian-lawn/.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/web start',
      cwd: '/var/www/canadian-lawn',
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
