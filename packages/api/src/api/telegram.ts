import axios from 'axios';

import { ENDPOINTS, ENV } from '@/config';

const telegramToken = ENV.TELEGRAM_BOT_TOKEN;
const telegramChatId = ENV.TELEGRAM_CHAT_ID;
const telegramOrderThreadId = ENV.TELEGRAM_ORDER_THREAD_ID;

export const telegramService = () => {
  const sendMessage = async (message: string) => {
    if (!telegramToken || !telegramChatId) {
      throw new Error('Telegram bot token required');
    }

    await axios.post(ENDPOINTS.telegram(telegramToken), {
      chat_id: telegramChatId,
      text: message,
      parse_mode: 'Markdown',
      message_thread_id: telegramOrderThreadId,
    });
  };

  return {
    sendMessage,
  };
};
