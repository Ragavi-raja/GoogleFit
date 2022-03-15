module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ... some other plugins
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '^~(.+)': './src/\\1',
          '^@assets_(.+)': './src/assets/\\1',
          '^@components_(.+)': './src/components/\\1',
          '^@config_(.+)': './src/config/\\1',
          '^@actions_(.+)': './src/reduxActions/\\1',
          '^@api_(.+)': './src/reduxApi/\\1',
          '^@reducers_(.+)': './src/reduxReducers/\\1',
          '^@screens_(.+)': './src/screens/\\1',
          '^@stylesheets_(.+)': './src/stylesheets/\\1',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
};
