module.exports = {
  apps: [
    {
      name: 'canadian-backend',
      script: '.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/backend serve:backend',
      cwd: '/var/www/cl',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
