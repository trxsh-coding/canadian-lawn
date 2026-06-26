'use client';

import { LawnProduct, lawnProductSchema, PRODUCT_POPULATE_LAWN } from '@canadian-lawn/api';
import { LawnCard } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Spinner } from '@/components/atoms/Loaders/Spinner';
import { detailRoutes } from '@/config/routes';
import { useAddItemToCart } from '@/hooks/api/useCart';
import { useProducts } from '@/hooks/api/useProducts';
import { useQueryParams } from '@/hooks/useUrlArrayParam';
import { AuthStatus } from '@/types/enums';
import { STRAPI_FILTER_MAP } from '@/utils/filters';

interface LawnsProps {
  productType: string;
}

export const Lawns = ({ productType }: LawnsProps) => {
  const session = useSession();
  const addItemMutation = useAddItemToCart(session.data?.user.jwt);
  const router = useRouter();

  const { pageParams } = useQueryParams();

  const filters = React.useMemo(() => {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(pageParams)) {
      if (typeof value !== 'string') continue;

      const mapper = STRAPI_FILTER_MAP[key];
      if (mapper) {
        const ids = value
          .split(',')
          .map(Number)
          .filter((n) => !isNaN(n));
        if (ids.length) Object.assign(result, mapper(ids));
        continue;
      }

      if (key === 'price') {
        const parts = value.split(',').map(Number);
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          result.price = { $gte: parts[0], $lte: parts[1] };
        }
      }
    }

    return result;
  }, [pageParams]);

  const handleAdd = React.useCallback(
    (item: LawnProduct) => {
      if (session.status !== AuthStatus.Authenticated) {
        toast.error('Войдите в аккаунт, чтобы добавить товар в корзину');
        return;
      }
      addItemMutation.mutate(
        { productId: item.id, quantity: 1, price: item.price },
        {
          onSuccess: () => toast.success(`${item.name} добавлен в корзину`),
          onError: (error) => toast.error(`Ошибка: ${error.message}`),
        }
      );
    },
    [addItemMutation, session.status]
  );

  const lawn = useProducts<z.ZodType<LawnProduct>>({
    populate: { ...PRODUCT_POPULATE_LAWN },
    schema: lawnProductSchema,
    filters: { ...filters, type: productType },
  }).useHook();
  if (lawn.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (lawn.isError) return null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {lawn?.data?.data.map((product) => (
          <LawnCard
            slug={product.slug || ''}
            key={product.id}
            className="!max-w-full self-center lg:!max-w-[480px]"
            buttonClassName="sm:!max-w-[50%] md:max-w-full sm:!w-[50%] md:!w-full"
            image={product.image?.url || ''}
            name={product.name}
            packages={product.lawn?.package ?? []}
            price={product.price}
            resistance={product.lawn?.resistance ?? 0}
            growth={product.lawn?.speed ?? 0}
            handleButtonChange={() => null}
            handleButtonClick={() => handleAdd(product)}
            handleCardClick={() => router.push(detailRoutes.lawn(product.slug || ''))}
            value={0}
          />
        ))}
      </div>
    </div>
  );
};
