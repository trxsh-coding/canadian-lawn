export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          endpoint: env('AWS_ENDPOINT'), // Overrides AWS with Timeweb
          region: env('AWS_REGION'),
          forcePathStyle: true, // Required for most S3-compatible providers
          params: {
            Bucket: env('AWS_BUCKET_NAME'),
          },
        },
      },
    },
  },
  'users-permissions': {
    enabled: true,
  },
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '2.0.0',
        title: 'Lawn API Documentation',
        description: 'API documentation for Lawn content type',
      },
      'x-strapi-config': {
        plugins: ['users-permissions'],
        path: '/documentation',
      },
      servers: [
        { url: env('SERVER_URL', 'http://localhost:1337/api'), description: 'Development server' },
      ],
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_USER'),
        defaultReplyTo: env('SMTP_USER'),
      },
    },
  },
});
