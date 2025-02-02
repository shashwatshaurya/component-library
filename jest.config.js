module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // setup the testing env, import files that are needed for testing
  testEnvironment: 'jsdom', // jsdom is a JavaScript implementation of the DOM and HTML standards and is used to test react components
  moduleFileExtensions: ['js', 'jsx'], // file extensions to look for
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // mock css files instead of loading them
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // transform js and jsx files using babel-jest
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // ignore node_modules and dist folders
  collectCoverage: true, // collect coverage information
  collectCoverageFrom: [
    // collect coverage from these files
    'src/**/*.{js,jsx}',
    '!src/**/*.stories.{js,jsx}',
    '!src/index.js',
  ],
  coverageReporters: ['html', 'text'], // coverage report format
};
