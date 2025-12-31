import type { Schema, Struct } from '@strapi/strapi';

export interface PostBlockCode extends Struct.ComponentSchema {
  collectionName: 'components_post_block_codes';
  info: {
    displayName: 'BlockCode';
  };
  attributes: {
    code: Schema.Attribute.Text & Schema.Attribute.Required;
    language: Schema.Attribute.Enumeration<
      [
        'javascript',
        'typescript',
        'python',
        'java',
        'c',
        'cpp',
        'csharp',
        'go',
        'rust',
        'php',
        'ruby',
        'swift',
        'kotlin',
        'dart',
        'scala',
        'bash',
        'sql',
        'html',
        'css',
        'json',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'typescript'>;
  };
}

export interface PostBlockCta extends Struct.ComponentSchema {
  collectionName: 'components_post_block_ctas';
  info: {
    displayName: 'BlockCTA';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface PostBlockImage extends Struct.ComponentSchema {
  collectionName: 'components_post_block_images';
  info: {
    displayName: 'BlockImage';
  };
  attributes: {
    caption: Schema.Attribute.String;
    file: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required;
    layout: Schema.Attribute.Enumeration<['full-width', 'constrained', 'sidebar']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'full-width'>;
  };
}

export interface PostBlockQuote extends Struct.ComponentSchema {
  collectionName: 'components_post_block_quotes';
  info: {
    displayName: 'BlockQuote';
  };
  attributes: {
    author: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PostBlockText extends Struct.ComponentSchema {
  collectionName: 'components_post_block_texts';
  info: {
    displayName: 'BlockText';
  };
  attributes: {
    body: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface PostBlockVideo extends Struct.ComponentSchema {
  collectionName: 'components_post_block_videos';
  info: {
    displayName: 'BlockVideo';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'post.block-code': PostBlockCode;
      'post.block-cta': PostBlockCta;
      'post.block-image': PostBlockImage;
      'post.block-quote': PostBlockQuote;
      'post.block-text': PostBlockText;
      'post.block-video': PostBlockVideo;
      'shared.meta-tag': SharedMetaTag;
    }
  }
}
