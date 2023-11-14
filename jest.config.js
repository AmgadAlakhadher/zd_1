/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.{jsx,tsx,ts}"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/public/",
    "/build/",
    "/.turbo/"
  ],
  globals: {
    tsconfig: ['ts-jest', {tsconfig: "./tsconfig.jest.json"}]
  },
  setupFilesAfterEnv: ['./src/setup-jest.ts'],
  moduleDirectories: ['node_modules', './src'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  verbose: true
};
