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
  navigation: {
    enabled: true,
    config: {
      contentTypes: ['api::home.home', 'api::about.about', 'api::category.category'],
      contentTypesNameFields: {
        'api::about.about': ['nav_label'],
        'api::home.home': ['nav_label'],
        'api::category.category': ['name'],
      },
      pathDefaultFields: {
        'api::about.about': ['nav_label'],
        'api::category.category': ['uid'],
      },
      allowedLevels: 2,
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
