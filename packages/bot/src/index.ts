import { bot } from '@/bot';

import { safeLaunch } from './utils';

safeLaunch(bot).catch((err) => {
  console.error('Bot failed to start:', err);
  process.exit(1);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
