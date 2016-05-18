const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const ENTRY_FILE = path.join(__dirname, 'app/entry.js');
const SCRIPTS_DIR = path.join(__dirname, 'app/scripts');
const STYLES_DIR = path.join(__dirname, 'app/stylesheets');
const BUILD_DIR = path.join(__dirname, 'build');
const PUBLIC_DIR = path.join(__dirname, 'public');
const TESTS_DIR = path.join(__dirname, 'tests');
const ASSET_PATH = '/assets/';

/**
 * Common Config
 *
 * This contains all WebPack config that is shared between each
 * environment.
 *
 * See below for target specific configurations.
 */
var config = {
  // Then entry file to start off our bundle
  entry: [ENTRY_FILE],
  output: {
    // The folder to output the production bundle
    path: BUILD_DIR,
    // The name of the bundle, used by both production and development
    filename: 'bundle.js',
    // The path where the bundle assets will be served from (also informs
    // webpack-dev-server where to serve from)
    publicPath: ASSET_PATH,
  },
  module: {
    preLoaders: [
      // Run ESLint before any other loader, so its running on exactly
      // the JS we have written
      {
        test: /.jsx?$/,
        loaders: ['eslint'],
        include: SCRIPTS_DIR,
      },
    ],
    loaders: [
      // Then process all our JS (and JSX) with Babel
      {
        test: /.jsx?$/,
        loaders: ['babel'],
        include: [SCRIPTS_DIR, TESTS_DIR],
      },
    ],
  },
  resolve: {
    // Allow us to require files without extensions
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
    // Allow us to require files wihtout always typing `app`
    root: [path.join(__dirname, 'app')],
    // Make it a bit nicer to require Foundation CSS
    alias: {
      'foundation/scss': 'foundation-sites/scss',
    },
  },
};

// Find out how Webpack is being run. Is it through `npm start` (meaning development) or
// `npm run build` (meaning production)?
const TARGET = process.env.npm_lifecycle_event;

// If its run with `npm start` or via the command line
if (TARGET === 'start' || !TARGET) {
  var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

  /**
   * Development Config
   *
   * This contains the extra settings we want to use in development.
   */
  config = merge(config, {
    // Create accurate, fairly quick source maps
    devtool: 'eval-source-map',
    devServer: {
      // Serve data from the public/ folder (where index.html is)
      contentBase: PUBLIC_DIR,
      // This allows us to use historyApi URLs in our client side app
      // without needing to configure a server
      historyApiFallback: true,
      // Enable hot module replacement (see the README for a complete
      // explanation of hot module replacement)
      hot: true,
    },
    // These extra entries are needed for hot module replacement
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
    ],
    output: {
      // An absolute path is needed here in order to [serve assets][1] served
      // from `blob://` in Chrome.
      //
      // [1] - http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts
      publicPath: `http://localhost:8080${config.output.publicPath}`,
    },
    module: {
      loaders: [
        {
          test: /.s?css$/,
          // Compile SASS, resolve `import` and `require` in the CSS
          // and inject the result into the DOM.
          loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
          include: STYLES_DIR,
        },
      ],
    },
    plugins: [
      // Required for hot module replacement (see README for a longer explanation)
      new webpack.HotModuleReplacementPlugin(),
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 3000,
          // Proxy webpack-dev-server through BrowserSync so we get
          // browser syncing with hot module replacement
          proxy: {
            // Where webpack-dev-server is running
            target: 'http://localhost:8080',
            // This lets BrowserSync know that the proxied server
            // is using websockets, so it can adjusts its own usage
            ws: true,
          },
          // Don't auto-open a browser window when BrowserSync starts
          open: false,
        },
        {
          // Don't need to use BrowserSyncs own 'auto reloading' feature
          // as we have that with hot module replacement
          reload: false,
        }
      ),
    ],
    eslint: {
      // Force ESLint to always emit a warning (in Webpack's eyes) so we'll
      // get a notification that the linting failed, but it won't stop the bundle
      // from being built.
      emitWarning: true,
    },
  });

  // Add the hot loader code BEFORE any other code
  config.entry.unshift('react-hot-loader/patch');
} else if (TARGET === 'build') {
  const ExtractPlugin = require('extract-text-webpack-plugin');
  const Csso = require('postcss-csso');

  /**
   * Production Config
   *
   * This contains the extra settings we want to use in production
   * only.
   */
  config = merge(config, {
    module: {
      loaders: [
        {
          // Process SASS -> CSS and then extract into separate file
          test: /.s?css$/,
          loader: ExtractPlugin.extract(['css', 'postcss', 'sass']),
          include: STYLES_DIR,
        },
      ],
    },
    plugins: [
      // Force React into production mode
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // Options for UglifyJS2
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // Don't show warnings when removing dead-code
          warnings: false,
        },
        // Don't need to support IE8
        screwIe8: true,
        // Shorten variable names etc
        mangle: true,
      }),
      // Extract CSS into separate file
      new ExtractPlugin('bundle.css'),
    ],
    eslint: {
      // Fail the build if linting fails
      failOnError: true,
    },
    postcss: function () {
      // Use csso optimizer for PostCSS
      return [Csso];
    },
  });
} else if (TARGET === 'test' || TARGET === 'test:watch') {
  config = merge(config, {
    // Overwrite the default entry and specify our test entry
    entry: `${TESTS_DIR}/entry.js`,
    // Output the test files in a tmp directory (that can be ignored in git)
    output: {
      path: 'tmp',
      filename: 'tests.js',
    },
    module: {
      loaders: [
        {
          // Still need to process these files, but don't need to use the style-loader
          test: /.s?css$/,
          loaders: ['css?sourceMap', 'sass?sourceMap'],
          include: STYLES_DIR,
        },
      ],
    },
    // This is required for Enzyme (http://airbnb.io/enzyme/docs/guides/webpack.html)
    externals: {
      cheerio: 'null', // This slight change is needed when running mocha from node
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
    target: 'node',
    eslint: {
      // Force ESLint to always emit a warning (in Webpack's eyes) so we'll
      // get a notification that the linting failed, but it won't stop the bundle
      // from being built.
      emitWarning: true,
    },
  });
} else if (TARGET === 'test:serve') {
  config = merge(config, {
    // Add test entry file and inline reloading code
    entry: [
      `mocha!${TESTS_DIR}/entry.js`,
      'webpack-dev-server/client?http://localhost:8000',
    ],
    devServer: {
      // Use a different port than the main dev server so we can
      // run both at the same time
      port: 8000,
    },
    output: {
      filename: 'browser_tests.js',
    },
    module: {
      loaders: [
        {
          // Still need to process these files, but don't need to use the style-loader
          test: /.s?css$/,
          loaders: ['css?sourceMap', 'sass?sourceMap'],
          include: STYLES_DIR,
        },
      ],
    },
    // This is required for Enzyme (http://airbnb.io/enzyme/docs/guides/webpack.html)
    externals: {
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
    eslint: {
      // Force ESLint to always emit a warning (in Webpack's eyes) so we'll
      // get a notification that the linting failed, but it won't stop the bundle
      // from being built.
      emitWarning: true,
    },
  });

  // Since webpack-merge will merge the config.entry if they are both arrays (the common
  // and this test config both use arrays for the entry option), we need to remove the original
  // 'app' entry
  config.entry.splice(0, 1);
}

module.exports = config;
