module.exports = {
  apps: [
    {
      name: 'canadian-web',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/canadian-lawn/apps/web',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
