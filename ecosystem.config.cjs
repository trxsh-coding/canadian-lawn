module.exports = {
  apps: [
    {
      name: 'canadian-frontend',
      script: '/var/www/canadian-lawn/.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/web serve:web',
      cwd: process.cwd(),
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
    {
      name: 'canadian-backend',
      script: '/var/www/canadian-lawn/.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/web serve:backend',
      cwd: process.cwd(),
      env: {
        NODE_ENV: 'production',
        PORT: '1337',
      },
    },
  ],
};
