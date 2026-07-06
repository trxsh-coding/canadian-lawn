import { ENDPOINTS, FetchMode, productSchema } from '@canadian-lawn/api';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'product-by-slug';

type UseProductDetailProps = {
  slug: string;
};

export const useProductDetail = ({ slug }: UseProductDetailProps) =>
  buildCollectionPrefetchQuery<typeof productSchema, FetchMode.ITEM>({
    endpoint: ENDPOINTS.common.getBySlug(slug, 'product'),
    schema: productSchema,
    queryKey: [queryKey, slug],
    mode: FetchMode.ITEM,
    params: {
      populate: [
        'image',
        'images',
        'partner',
        'lawn',
        'lawn.mix',
        'lawn.mix.product',
        'lawn.mix.product.images',
        'lawn.package',
        'lawn.landing',
        'lawn.type',
        'categories',
        'features',
        'characteristic',
      ],
    },
  });
