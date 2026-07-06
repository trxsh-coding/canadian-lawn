export const roleFilter = {
  filter: {
    role: {
      name: {
        $eq: 'Manager',
      },
    },
  },
};

export const featureFilter = {
  isFeature: {
    $eq: true,
  },
};

export const partnerLimit = 20;

export const lawnLimit = 4;

// Maps filter field names (from backend) to Strapi query filter objects
export const STRAPI_FILTER_MAP: Record<string, (ids: number[]) => Record<string, unknown>> = {
  partnerTypes: (ids) => ({ partners_types: { id: { $in: ids } } }),
  lawnTypes: (ids) => ({ lawn: { type: { id: { $in: ids } } } }),
  brands: (ids) => ({ brand: { id: { $in: ids } } }),
  features: (ids) => ({ features: { id: { $in: ids } } }),
};

// Used in SSR (server components) to build Strapi filters from searchParams
export const buildSSRFilters = (
  params: Record<string, string | undefined>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;

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
};

export const getParams = (params: string | undefined) =>
  typeof params === 'string' ? params.split(',').map(Number) : [];
