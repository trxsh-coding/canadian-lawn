import { Telegraf } from 'telegraf';
import { ENV, telegramService } from '@canadian-lawn/api';

export const bot = new Telegraf(ENV.TELEGRAM_BOT_TOKEN, {
  telegram: { webhookReply: false },
});

bot.command('start', async (ctx) => {
  await ctx.reply('Бот готов 🚀');
});

bot.command('testorder', async (ctx) => {
  await telegramService().sendMessage('Тестовая заявка 🚀');
  await ctx.reply('✅ Заявка отправлена!');
});

bot.on('text', (ctx) => {
  ctx.reply('Я понимаю только команды типа /start или /testorder');
});
