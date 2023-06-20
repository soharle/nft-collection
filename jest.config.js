module.exports = {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testTimeout": 20000,
    "setupFilesAfterEnv": [
        "<rootDir>/src/tests/jest.setup.ts"
    ],
    "roots": [
      "<rootDir>/src/tests"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }
  