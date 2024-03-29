module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|js)",
        "**/?(*.)+(spec|test).+(ts|js)"
    ],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    coverageDirectory: '<rootDir>/coverage',
    collectCoverage: true,
    coverageReporters: ['text', 'lcov'],
    testResultsProcessor: "jest-sonar-reporter",
    collectCoverageFrom: [
        "**/*.{js,ts}",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        }
    }
}
