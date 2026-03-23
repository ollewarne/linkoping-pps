export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.json' }],
  '^.+\\.jsx?$': 'babel-jest',  // <-- denna rad ser redan korrekt ut
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./src/tests/setupTest.ts'],
  testPathIgnorePatterns: ['/node_module/', '/dist/'],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/src/tests/styleMock.js"
  }
};
