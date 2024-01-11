const ts = require("typescript");
const { pathsToModuleNameMapper } = require("ts-jest/utils");

const { config: tsconfig } = ts.readConfigFile(
  "./tsconfig.json",
  ts.sys.readFile,
);

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest"],
  },
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths ?? {},
    { prefix: "<rootDir>" },
  ),
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

module.exports = config;