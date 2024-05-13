module.exports = {
  printWidth: 180,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: true,
  endOfLine: 'auto',
  singleQuote: true,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'],
      options: {
        singleQuote: false,
        printWidth: 1000,
      },
    },
    {
      files: ['package.json', 'package-lock.json', 'src/shared/translations/nl.json'],
      options: {
        useTabs: false,
        tabWidth: 2,
      },
    },
  ],
};
