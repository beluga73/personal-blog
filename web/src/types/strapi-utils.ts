import { BlocksContent } from '@strapi/blocks-react-renderer';
import { Schema } from '@strapi/types';

/**
 * Converts Strapi Schema Attributes to actual Data types.
 */
export type InferAttribute<T> = T extends
  | Schema.Attribute.String
  | Schema.Attribute.Text
  | Schema.Attribute.Email
  | Schema.Attribute.Enumeration<string[]>
  | Schema.Attribute.UID<string>
  | Schema.Attribute.Password
  | Schema.Attribute.RichText
  ? string
  : T extends
        | Schema.Attribute.Integer
        | Schema.Attribute.BigInteger
        | Schema.Attribute.Float
        | Schema.Attribute.Decimal
    ? number
    : T extends Schema.Attribute.Boolean
      ? boolean
      : T extends
            | Schema.Attribute.DateTime
            | Schema.Attribute.Date
            | Schema.Attribute.Time
            | Schema.Attribute.Timestamp
        ? string
        : T extends Schema.Attribute.JSON
          ? unknown
          : T extends Schema.Attribute.Blocks
            ? BlocksContent
            : T extends Schema.Attribute.Media<infer _TKind, infer TMultiple>
              ? TMultiple extends true
                ? StrapiMedia[]
                : StrapiMedia
              : T extends Schema.Attribute.Component<
                    infer TComponentUID,
                    infer TRepeatable
                  >
                ? TRepeatable extends true
                  ? InferData<TComponentUID>[]
                  : InferData<TComponentUID>
                : T extends Schema.Attribute.Relation
                  ? unknown // Relations are complex in Strapi 5
                  : unknown;

export interface StrapiMediaFormat {
  url: string;
  name: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  hash: string;
  ext: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat>;
  mime: string;
  size: number;
}

export type InferData<T extends string> = T extends keyof Schema.Schemas
  ? {
      id: number;
      documentId: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    } & {
      [K in keyof Schema.Schemas[T]['attributes']]: InferAttribute<
        Schema.Schemas[T]['attributes'][K]
      >;
    }
  : unknown;

/**
 * Helper for Strapi 5 response structure
 */
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
