import { Telegraf } from 'telegraf';

export async function safeLaunch(bot: Telegraf) {
  console.log('Checking webhook...');
  const info = await bot.telegram.getWebhookInfo();
  if (info.url) {
    console.log(`Webhook active: ${info.url}, deleting...`);
    await bot.telegram.deleteWebhook({ drop_pending_updates: true });
    console.log('Webhook cleared');
  } else {
    console.log('Webhook not active.');
  }

  console.log('Launching polling...');
  await bot.launch();
  console.log('Bot started 🚀');
}
