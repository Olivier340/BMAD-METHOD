module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!**/__tests__/**'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
