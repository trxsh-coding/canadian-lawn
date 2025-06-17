import { ENV } from '@/config/env';

export const getImageUrl = (imageUrl: string) => ENV.strapi?.concat(imageUrl);
