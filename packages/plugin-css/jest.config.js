module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules", "/src/*/__tests__/utils"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
