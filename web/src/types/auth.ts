import { InferData } from './strapi-utils';

export type StrapiUser = InferData<'plugin::users-permissions.user'>;

export type StrapiLoginResponse = {
  jwt: string;
  user: StrapiUser;
};

export type StrapiRegisterResponse = Pick<StrapiLoginResponse, 'user'>;

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  identifier: string;
  password: string;
}
