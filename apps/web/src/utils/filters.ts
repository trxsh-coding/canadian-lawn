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

export const partnerLimit = 3;

export const lawnLimit = 3;
