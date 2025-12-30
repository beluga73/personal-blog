import { InferData } from './strapi-utils';

export type StrapiUser = InferData<'plugin::users-permissions.user'>;

export interface StrapiAuthResponse {
  user: StrapiUser;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  identifier: string;
  password: string;
}
