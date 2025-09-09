import type { Schema, Struct } from '@strapi/strapi';

export interface CommonBlocks extends Struct.ComponentSchema {
  collectionName: 'components_common_blocks';
  info: {
    displayName: 'Blocks';
  };
  attributes: {
    block: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'canadian-lawn';
        }
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonCharacteristic extends Struct.ComponentSchema {
  collectionName: 'components_common_characteristics';
  info: {
    displayName: 'Characteristic';
  };
  attributes: {
    name: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface CommonLawnTypePercent extends Struct.ComponentSchema {
  collectionName: 'components_common_lawn_type_percents';
  info: {
    displayName: 'Lawn type percent';
  };
  attributes: {
    lawn_type: Schema.Attribute.Relation<'oneToOne', 'api::lawn-type.lawn-type'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    percent: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
        },
        number
      >;
  };
}

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

export interface CommonRequisite extends Struct.ComponentSchema {
  collectionName: 'components_common_requisites';
  info: {
    displayName: 'Requisite';
  };
  attributes: {
    date: Schema.Attribute.Date;
    value: Schema.Attribute.BigInteger;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'common.blocks': CommonBlocks;
      'common.characteristic': CommonCharacteristic;
      'common.lawn-type-percent': CommonLawnTypePercent;
      'common.months': CommonMonths;
      'common.packages': CommonPackages;
      'common.requisite': CommonRequisite;
    }
  }
}
