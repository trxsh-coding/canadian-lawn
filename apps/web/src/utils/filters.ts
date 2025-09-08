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

export const partnerLimit = 4;

export const lawnLimit = 4;

export const lawnFilters = ({
  partnerTypes,
  lawnTypes,
}: {
  partnerTypes: number[];
  lawnTypes: number[];
}) => ({
  filters: {
    partners_types: { id: { $in: partnerTypes } },
    type: { lawn_type: { id: { $in: lawnTypes } } },
  },
});

export const getParams = (params: string | undefined) =>
  typeof params === 'string' ? params.split(',').map(Number) : [];
