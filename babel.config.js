module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-runtime', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }]
  ]
};
