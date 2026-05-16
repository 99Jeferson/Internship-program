import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
const isAnalyze = process.env.ANALYZE === 'true'

export default {
  // Entry point — where Webpack starts reading your app
  entry: './src/main.jsx',

  // Output — where the finished bundle goes
  output: {
    path: path.resolve(__dirname, 'dist-webpack'),
    filename: isDev
      ? 'js/[name].js'
      : 'js/[name].[contenthash:8].js',   // hash changes when file changes
    chunkFilename: isDev
      ? 'js/[name].chunk.js'
      : 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    clean: true,   // clears dist-webpack before each build
  },

  mode: isDev ? 'development' : 'production',

  // Source maps — lets you see original code in browser devtools
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',

  // Rules — tell Webpack how to handle each file type
  module: {
    rules: [
      // JavaScript and JSX — run through Babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,   // speeds up rebuilds
          }
        }
      },

      // CSS — extract to separate file in production
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },

      // Images and fonts — copy to output folder
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

  // Plugins — do things loaders can't
  plugins: [
    // Generate index.html with script tags injected
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './public/vite.svg',
      minify: !isDev && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }
    }),

    // Extract CSS into separate .css files (production only)
    !isDev && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),

    // Bundle analyzer — generates visual report
    isAnalyze && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: true,
    }),

  ].filter(Boolean),   // removes false entries from the array

  // Optimization — runs in production mode
  optimization: {
    minimize: !isDev,
    minimizer: [
      // Minify JavaScript
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,   // removes all console.log in production
          },
          format: {
            comments: false,
          }
        },
        extractComments: false,
      }),

      // Minify CSS
      new CssMinimizerPlugin(),
    ],

    // Code splitting strategy
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Split vendor libraries into a separate chunk
        // (they change less often so browser can cache them longer)
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20,
        },
        // Split MUI into its own chunk — it's very large
        mui: {
          test: /[\\/]node_modules[\\/]@mui[\\/]/,
          name: 'mui',
          chunks: 'all',
          priority: 30,
        },
      }
    },

    // Keep module IDs stable across builds (better long-term caching)
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
  },

  // File resolution — which extensions to try automatically
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  // Dev server config
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    port: 3000,
    hot: true,
    historyApiFallback: true,   // required for React Router
    compress: true,
  },

  // Performance warnings
  performance: {
    hints: isDev ? false : 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}