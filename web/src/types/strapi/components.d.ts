import type { Schema, Struct } from '@strapi/types';

export interface SharedMetaTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_tags';
  info: {
    displayName: 'MetaTag';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
        minLength: 2;
      }>;
  };
}

declare module '@strapi/types' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.meta-tag': SharedMetaTag;
    }
  }
}
