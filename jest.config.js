module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    
    // Setup files
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    
    // Module paths
    moduleNameMapper: {
      '^@features/(.*)$': '<rootDir>/src/features/$1',
      '^@shared/(.*)$': '<rootDir>/src/shared/$1',
      '^@app/(.*)$': '<rootDir>/src/app/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    
    // Coverage
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/index.tsx',
      '!src/setupTests.ts',
    ],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    
    // Test patterns
    testMatch: [
      '**/__tests__/**/*.test.{ts,tsx}',
      '**/*.test.{ts,tsx}',
    ],
    
    // Transform
    transform: {
      '^.+\\.tsx?$': ['ts-jest', {
        tsconfig: {
          jsx: 'react-jsx',
        },
      }],
    },
  };