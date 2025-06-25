import type { Schema, Struct } from '@strapi/strapi';

export interface CommonMonths extends Struct.ComponentSchema {
  collectionName: 'components_common_months';
  info: {
    displayName: 'Months';
  };
  attributes: {
    february: Schema.Attribute.Boolean;
    january: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'common.months': CommonMonths;
    }
  }
}
