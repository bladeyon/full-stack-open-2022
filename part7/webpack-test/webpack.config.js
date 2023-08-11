const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
  console.log(argv.mode);
  const apiUrl =
    argv.mode === 'development'
      ? 'http://localhost:3501/notes'
      : 'https://obscure-harbor-49797.herokuapp.com/api/notes';
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          // 通过 babel-loader 加载器打包后缀为 .js 的文件
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
          include: [path.join(__dirname, 'src/')]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(apiUrl)
      })
    ],
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3500
    },
    devtool: 'source-map'
  };
};

module.exports = config;
