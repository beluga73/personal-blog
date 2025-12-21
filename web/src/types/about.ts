import { InferData } from './strapi-utils';

/**
 * This extracts the actual data shape from the generated Strapi schema.
 * No more manual typing!
 */
export type AboutData = InferData<'api::about.about'>;
