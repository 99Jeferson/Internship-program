import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, existsSync } from 'fs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
const isAnalyze = process.env.ANALYZE === 'true'

// Read .env file
const envVars = {}
if (existsSync('.env')) {
  const envFile = readFileSync('.env', 'utf-8')
  envFile.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=')
      envVars[key.trim()] = rest.join('=').trim()
    }
  })
}

export default {
  entry: './src/main.jsx',

  output: {
    path: path.resolve(__dirname, 'dist-webpack'),
    filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: isDev ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    clean: true,
  },

  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      }
    ]
  },

  plugins: [
    //  Injects API key and env variables into the bundle at build time
    new webpack.DefinePlugin({
      'process.env.WEATHER_API_KEY': JSON.stringify(envVars.VITE_WEATHER_API_KEY || ''),
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      minify: !isDev && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
      }
    }),

    !isDev && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),

    isAnalyze && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: true,
    }),

  ].filter(Boolean),

  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          format: { comments: false }
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20,
        },
        mui: {
          test: /[\\/]node_modules[\\/]@mui[\\/]/,
          name: 'mui',
          chunks: 'all',
          priority: 30,
        },
      }
    },
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true,
  },

  performance: {
    hints: isDev ? false : 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}