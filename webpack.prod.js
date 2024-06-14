const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const dotenv = require('dotenv').config({ path: './.env' });

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      /* 这个标志用于控制是否启用Options API。Options API是Vue的传统API，Vue 3中默认是启用的。
            如果你的项目只使用Composition API，那么你可以通过设置这个标志为false来禁用Options API，以减小最终的打包体积 */
      __VUE_OPTIONS_API__: true,
      /* 这个标志用于控制是否在生产环境中启用Vue Devtools。默认情况下，Vue Devtools在生产环境中是禁用的，因为它可能会暴露你的应用程序的内部状态。
            如果你需要在生产环境中使用Vue Devtools进行调试，你可以通过设置这个标志为true来启用它 */
      __VUE_PROD_DEVTOOLS__: false,
      /* 这个标志用于控制是否在生产环境中提供hydration mismatch（水合失配）的详细信息。
            hydration mismatch是在服务器端渲染（SSR）中可能出现的问题，当服务器端和客户端生成的HTML不匹配时，就会出现hydration mismatch。
            默认情况下，Vue在生产环境中不会提供这些详细信息，以减小打包体积。如果你需要这些信息来调试你的SSR应用，你可以通过设置这个标志为true来启用它 */
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body', // 确保 <script> 标签被注入到 </body> 标签之前
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
      '@components': path.resolve(__dirname, 'src/components/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
    extensions: ['.*', '.js', '.vue', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      /* 为了避免生成体积过大的文件 */
      // maxSize: 50000, // 模块体积大于或等于50000字节（约等于50KB）时，webpack会尝试将这个模块进一步分割成更小的块

      /* 为了避免将体积过小的模块分割出来，因为这样可能会导致生成过多的小文件，反而会增加加载时间 */
      // minSize: 10000, // 模块体积大于或等于10000字节（约等于10KB）时，webpack才会考虑将这个模块分割出来，否则会将它保留在原来的代码块中

      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
};
