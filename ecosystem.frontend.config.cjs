module.exports = {
  apps: [
    {
      name: 'canadian-frontend',
      script: '.yarn/releases/yarn-4.9.2.cjs',
      args: 'workspace @canadian-lawn/web serve:web',
      cwd: '/var/www/cl',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
