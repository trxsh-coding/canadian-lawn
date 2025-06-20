import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const CONFIG = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID!,
  TELEGRAM_ORDER_THREAD_ID: Number(process.env.TELEGRAM_ORDER_THREAD_ID),
};
