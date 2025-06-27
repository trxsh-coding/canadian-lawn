import type { Schema, Struct } from '@strapi/strapi';

export interface CommonMonths extends Struct.ComponentSchema {
  collectionName: 'components_common_months';
  info: {
    displayName: 'Months';
  };
  attributes: {
    april: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    august: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    december: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    february: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    january: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    july: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    june: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    march: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    may: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    november: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    october: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    september: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface CommonPackages extends Struct.ComponentSchema {
  collectionName: 'components_common_packages';
  info: {
    displayName: 'Packages';
  };
  attributes: {
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    weight: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'common.months': CommonMonths;
      'common.packages': CommonPackages;
    }
  }
}
