// import nodemailer from 'nodemailer';
// import { telegramService } from '@canadian-lawn/api';
// import 'dotenv/config';
//
// async function main() {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.yandex.ru',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
//
//   let info = await transporter.sendMail({
//     from: '"Тестовый SMTP" <youngknxwn1337@yandex.ru>',
//     to: 'youngpuyo@gmail.com',
//     subject: 'Тест SMTP',
//     text: 'Если ты читаешь это письмо — SMTP работает 🎯',
//   });
//   let response = await telegramService().sendMessage('У вас новый заказ');
//   console.log(response);
// }
//
// main().catch(console.error);
