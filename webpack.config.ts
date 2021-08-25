import path from 'path'
import dotenv from 'dotenv'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

dotenv.config()

const config = {
  entry: './frontend/src/index.tsx',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build', 'frontend'),
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|js)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
          require.resolve('sass-loader')
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|webp|woff|woff2)$/,
        type: 'asset/resource'
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js']
  },
  devServer: {
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    },
    static: {
      directory: path.resolve(__dirname, 'build', 'frontend')
    },
    port: 3001,
    historyApiFallback: { index: 'index.html' }
  },
  devtool: 'source-map',
  node: { __dirname: true },
}

// This needs to stay an old-fashioned module export because cypress relies on it
module.exports = config
