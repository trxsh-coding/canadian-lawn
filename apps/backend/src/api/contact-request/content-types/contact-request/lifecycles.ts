export default {
  async afterCreate(event) {
    const { result } = event;
    const notifyEmail = process.env.ORDER_NOTIFY_EMAIL;

    if (!notifyEmail) return;

    try {
      await strapi.plugins['email'].services.email.send({
        to: notifyEmail,
        subject: 'Новая заявка обратной связи',
        html:
          `<p>Поступила новая заявка с сайта</p>` +
          `<p>Имя: ${result.name ?? '—'}<br/>` +
          `Email: ${result.email ?? '—'}<br/>` +
          `Телефон: ${result.phone ?? '—'}</p>` +
          (result.message ? `<p>Сообщение: ${result.message}</p>` : ''),
      });
    } catch (e) {
      strapi.log.error('Contact request notification email failed:', e);
    }
  },
};
