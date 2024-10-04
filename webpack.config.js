const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    // Extension Configuration (Node.js environment)
    target: 'node',
    entry: './src/extension.ts',
    output: {
      path: path.resolve(__dirname, 'out'),
      filename: 'extension.js',
      libraryTarget: 'commonjs2',
    },
    externals: {
      vscode: 'commonjs vscode',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
    },
    devtool: 'source-map',
  },
  {
    // Webview Configuration (Browser environment)
    target: 'web',
    entry: './src/webview/index.tsx',
    output: {
      path: path.resolve(__dirname, 'out'),
      filename: 'webview.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url/'),
        fs: false,
        net: false,
        tls: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    module: {
      rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
    },
    devtool: 'source-map',
  },
];