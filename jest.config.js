module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.integration.test.ts'],
  // Si tu veux voir les logs console dans les tests, active ça :
  // verbose: true,
  // silent: false,
  // coveragePathIgnorePatterns: ['/node_modules/'],
};
