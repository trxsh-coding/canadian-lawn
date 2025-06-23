module.exports = {
  apps: [
    {
      name: 'canadian-web',
      script: '/var/www/canadian-lawn/.yarn/releases/yarn-4.9.2.cjs',
      args: 'start',
      cwd: '/var/www/canadian-lawn/apps/web',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
