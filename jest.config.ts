/* eslint-disable import/extensions */
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    // Add more setup options before each test is run
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ["/node_modules/", "/src/styles/*.css"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx|js|jsx|mjs)$': 'babel-jest',
    },
   
    transformIgnorePatterns: [
      'node_modules/(?!(lucide-react|@mui/x-charts)/)',
    ],
    moduleNameMapper: {
      '^@/src/(.*)$': '<rootDir>/src/$1',
      
    //    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironmentOptions: {
        isomorphic: true,
        url: 'http://localhost/',
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
