module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native|@react-navigation/native|@react-navigation/stack|@react-native-async-storage/async-storage|react-native-safe-area-context|react-native-paper|react-native-responsive-fontsize|react-native-reanimated|@expo/vector-icons|react-native-iphone-x-helper)/)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    moduleFileExtensions: [
      'js',
      'jsx',
      'ts',
      'tsx',
      'json',
      'node',
    ],
    testEnvironment: 'jsdom',
    setupFiles: ['./jest.setup.js'],
    moduleNameMapper: {
      '^@database/(.*)$': '<rootDir>/database/$1',
    },
  };
  