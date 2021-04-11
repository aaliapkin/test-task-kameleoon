module.exports = {
  preset: "ts-jest",
  verbose: false,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^ts(.*)$": "<rootDir>/src/ts$1",
    "^.+\\.(css|less|scss).*$": "identity-obj-proxy",
  },
  moduleDirectories: [".", "src", "node_modules"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
}
