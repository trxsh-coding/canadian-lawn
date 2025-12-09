import { Cart } from '@/components/sections/Cart';

export const revalidate = 1000;

export default async function userCartPage() {
  return <Cart />;
}
