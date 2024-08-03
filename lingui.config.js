const linguiConfig = {
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['<rootDir>/src'],
    },
  ],
  compileNamespace: 'cjs',
  fallbackLocales: {
    default: 'en-GB',
  },
  format: 'po',
  formatOptions: {
    lineNumbers: false,
  },
  locales: [
    'en-GB',
    'es-ES',
    'pseudo',
  ],
  orderBy: 'messageId',
  rootDir: '.',
  runtimeConfigModule: ['@lingui/core', 'i18n'],
  sourceLocale: 'en-GB',
  pseudoLocale: 'pseudo',
};

module.exports = linguiConfig;
