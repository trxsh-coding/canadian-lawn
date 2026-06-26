type ProductType = 'lawn' | 'lawn-mix' | 'tractor' | 'technique';

type FilterParams = Record<string, unknown>;

const parseIds = (param: unknown): number[] | null => {
  if (typeof param !== 'string' || !param.trim()) return null;
  const ids = param
    .split(',')
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);
  return ids.length ? ids : null;
};

const buildLawnFilters = (params: FilterParams) => {
  const filters: Record<string, unknown> = {};

  const lawnTypeIds = parseIds(params.lawnTypes);
  const partnerTypeIds = parseIds(params.partnerTypes);
  const brandIds = parseIds(params.brands);
  const featureIds = parseIds(params.features);

  if (lawnTypeIds) filters['lawn_type'] = { id: { $in: lawnTypeIds } };
  if (partnerTypeIds) filters['partner'] = { partners_types: { id: { $in: partnerTypeIds } } };
  if (brandIds) filters['brand'] = { id: { $in: brandIds } };
  if (featureIds) filters['features'] = { id: { $in: featureIds } };

  return filters;
};

const FILTER_BUILDERS: Record<string, (p: FilterParams) => Record<string, unknown>> = {
  lawn: buildLawnFilters,
  'lawn-mix': buildLawnFilters,
};

export const buildProductFilters = (type: ProductType, params: FilterParams) => {
  const builder = FILTER_BUILDERS[type];

  return {
    type: { $eq: type },
    ...(builder ? builder(params) : {}),
  };
};
