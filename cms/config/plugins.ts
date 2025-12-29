export default ({ env }) => ({
  'strapi-v5-http-only-auth': {
    enabled: true,
    config: {
      cookieOptions: {
        secure: env('NODE_ENV') === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'lax',
        domain: env('CLIENT_DOMAIN', 'localhost'),
        path: '/',
      },
      deleteJwtFromResponse: true,
    },
  },
  email: {
    config: {
      provider: 'strapi-provider-email-resend',
      providerOptions: {
        apiKey: env('RESEND_API_KEY'),
      },
      settings: {
        defaultFrom: env('RESEND_EMAIL'),
        defaultReplyTo: env('RESEND_EMAIL'),
      },
    },
  },
});
