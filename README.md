# Boiling Hot React

- [Introduction](#introduction)
  - [What is this?](#what-is-this)
  - [Currently using...](#currently-using)
  - [No Gulp?](#no-gulp)
- [Installation](#installation)
- [Usage](#usage)
- [Webpack](#webpack)
  - [Reasoning](#reasoning)
  - [Config](#config)
    - [Common](#common)
    - [Development](#development)
    - [Production](#production)
  - [Development Server](#development-server)
    - [Hot Reloading (or Hot Module Replacement)](#hot-reloading-or-hot-module-replacement)
- [Javascript](#javascript)
  - [Babel](#babel)
  - [Linting](#linting)
- [React](#react)
  - [Linting](#linting-react)
- SASS
  - BEM
- Testing
  - React

## Introduction

_Firstly, this readme is currently incomplete. Here is a list of things that will be added:_

  - _CSS/SASS Style Guide_
  - _SVG and image bundling/inlining_
  - _Testing (JS and React)_


### What is this?

This is a boilerplate project for a basic front-end website based on [React](https://facebook.github.io/react/), with all the developer-focused bells and whistles such as __hot reloading__ and [BrowserSync](https://www.browsersync.io/).

Hopefully we can use this as a starting point for future front-end projects. As we learn new stuff, this boilerplate project can be updated!

It contains a very simple, single page application used to demonstrate best practices for [React](https://facebook.github.io/react/), [SASS](http://sass-lang.com/) etc. whilst making the development environment setup extremely simple.

#### The App

This is a very simple, 'Single Page Application', with two _client side_ routes (using [React Router](https://github.com/reactjs/react-router)).

The first 'page' contains two tabs, which uses Foundation's __styles__ but the actual tab component is written in React. On the tabs we have two more React components: a simple counter and a quote generator. These all use React state, so its a perfect opportunity to test hot module replacement.

After [setting up the environment](#installation), try clicking the cookies button a few times and then make a change to the component file (`app/scripts/components/counter.jsx`). Try changing the text of button. If hot module replacement is working, you should almost instantly see the updated button text without the counter resetting back to zero!

See below for more about [hot module replacement](#hot-reloading-or-hot-module-replacement).

### Currently using...

- [Node](https://nodejs.org/en/) ([5.11.1](https://nodejs.org/en/download/releases/))
- [npm](https://www.npmjs.com/) (3.8.6)
- [React](https://facebook.github.io/react/) ([15.0.1](https://facebook.github.io/react/downloads.html))
- [Webpack](https://webpack.github.io/) (1.13.0)
- [Babel](https://babeljs.io/) (6.7.7)
- Mostly [ES6-flavoured](https://github.com/lukehoban/es6features) Javascript

_Note: Node 6 isn't supported by many of the above modules yet, so we are sticking to 5.11 for now._

### No Gulp?

You may notice something missing in the above list. No mention of [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/)?

As we'll mention below in a minute, [Webpack](https://webpack.github.io/) handles a lot of what Gulp or Grunt does. And for everything else, there are npm scripts.

For simple to relatively complex projects, we believe the combination of [Webpack](https://webpack.github.io/) and npm scripts is enough. If a project gets too large, a switch to [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/) is still possible.

## Installation

To get started, clone this repository

    git clone git@github.com:adransom/react-boilerplate.git

then go into the project directory and install the dependencies. Make sure you are using Node 5.11.1

    node -v
    => 5.11.1

    npm install

__Make sure you have the versions of Node and npm listed above!__ It is recommended to use a tool such as [nvm](https://github.com/creationix/nvm) to manage your node versions. Once thats installed, you can simply run `nvm use` in the root of the project and [nvm](https://github.com/creationix/nvm) will read the `.nvmrc` and select the right version of Node.

## Usage

Everything is controlled by npm scripts. A quick description of each command is provided below:

### `npm start`

This command runs `webpack-dev-server`, bundling and serving the files whilst handling hot reloading. In a 'real' project, it can be setup to handle asset serving for a backend framework (like Rails).

After running `npm start` the regular site will be available at [http://localhost:8080](http://localhost:8080) and the BrowserSync-enabled site will be available at [http://localhost:3000](http://localhost:3000).

### `npm test`

Coming soon...

### `npm run build`

This command runs `webpack -p` and builds production-ready assets. It will output the bundles (JS CSS, fonts, images etc) into the `build/` folder. In a 'real' project, this can also handle uploading files to a CDN etc (or can be put into a separate npm script step).

It also copies `index_production.html` to the `build/` folder, in order to be able to simulate how the bundle would be loaded in a production environment.

### `npm run prod`

This uses [superstatic](https://www.npmjs.com/package/superstatic) to serve the production assets from the `build/` folder. This is just an example to see how serving the assets differs from development mode.

### `npm run lint`

This actually runs two other npm scripts: `npm run lint-app` and `npm run lint-config`. This uses [ESLint](http://eslint.org/) (with [Airbnb's rules](https://github.com/airbnb/javascript)) to lint the app and the [Webpack](https://webpack.github.io/) config, respectively. The reason they are two seperate steps is that we want to use slightly different rules for the config, as the node version we use doesn't have great ES6 support, so we need to be a little looser with Airbnb's rules for that file.

The settings for the app linting are in `.eslintrc` and the settings for the config linting are in `.eslintrc.config`.

We may add git hooks, so that the linter is run (and has to pass) before committing.

## Webpack

Ah, the eternal debate: [Webpack](https://webpack.github.io/) or [Browserify](http://browserify.org/)?

This boilerplate, as you may have guessed, uses [Webpack](https://webpack.github.io/). Let us explain why.

### Reasoning

- __Complete Solution__

  [Webpack](https://webpack.github.io/) is a complete solution. Rather than just allowing bundling of javascript modules, it can handle bundling of CSS and images too. This allows you to do great things, such as requiring your CSS dependencies _right inside React components_ (more on this on later).

- __Hot Reloading__

  [Webpack](https://webpack.github.io/) also has almost out-of-the-box __hot reloading__ (or __hot module replacement__). This allows you to update React components and have them update without a full page reload. This means updating components, seeing the results instantly and having the _application state remain_. It makes development extremely fluid. Of course, you also get hot reload of CSS/SASS as well, changing styles on the fly without a full page reload.

- __Built-in Dev Server__

  It has its own development server, which serves JS and CSS without creating build files and handles the hot reloading.

- __Full Workflow__

  [Webpack](https://webpack.github.io/) also handles what [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/) are usually used for, as it supports plugins for minification, linting, concatenation, [PostCSS](http://postcss.org/) and most other things you can imagine.

- __Fast__

  Whilst the initial build when first starting the development server may be 'slow', incremental builds after that are extremely fast. Coupled with hot reloading, its a very smooth experience.

### Config

We've tried to keep the config as simple as possible, whilst providing a nice development environment and proper production builds.

There are 3 parts to the config: the common settings, the development-specific settings and the production-specific settings. In order to merge the different configs, we use a small utility called [webpack-merge](https://www.npmjs.com/package/webpack-merge). This was written by a guy who wrote an [excellent guide](http://survivejs.com/webpack_react/introduction/) on setting up Webpack with React (which a lot of this setup is based on).

It is __highly recommended__ to read the [Webpack docs](http://webpack.github.io/docs), specifically the [tutorial]() and the [config docs](http://webpack.github.io/docs/configuration.html). These will make understanding this section a lot easier.

#### Common

```JavaScript
entry: [ ENTRY_FILE ]
```

All configs need an [`entry`](http://webpack.github.io/docs/configuration.html#entry) point. This is the root file/folder that will start off the bundle, requiring various other modules etc. We use a single entry file, which loads both the whole JS app and the base styles. It may seem odd to require CSS in Javascript files, but we'll touch more on that later.

_Note: Even though we only have one entry file, we define it as an array as we want to add additional entries in the development-specific settings._

```JavaScript
output: {
  path: BUILD_DIR,
  filename: 'bundle.js',
  publicPath: ASSET_PATH,
}
```

The [`output`](http://webpack.github.io/docs/configuration.html#output) defines where bundles (and other files) get put after being processed. We specify 3 specific settings for the [`output`](http://webpack.github.io/docs/configuration.html#output) option:

  - [`path`](http://webpack.github.io/docs/configuration.html#output-path) – This is the directory the __production__ files will be output to after being processed.
  - [`filename`](http://webpack.github.io/docs/configuration.html#output-filename) – The name of the file in both __development__ and __production__ (even though no real files are output in development).
  - [`publicPath`](http://webpack.github.io/docs/configuration.html#output-publicpath) – The path the bundle files will be served at by the development server. Also can be used when setting up CDNs.
  
##### [Preloaders](http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders)

Preloaders run before regular loaders. For now, we just use this section for running the linter.

```JavaScript
{
  test: /.jsx?$/,
  loaders: ['eslint'],
  include: SCRIPTS_DIR,
}
```

This preloader runs [ESLint](http://eslint.org/) (via the [eslint-loader](https://github.com/MoOx/eslint-loader)) across all the scripts. We put this in a preloader in order to make sure it runs before Babel (which transforms the JS we write). The settings for [ESLint](http://eslint.org/) are in `.eslintrc` in the project root. We use a very slightly modified version of [Airbnb's style guide](https://github.com/airbnb/javascript).

By default, an error in the linter will stop the bundle from being built. This strictly enforces the style guide, which we believe is a good thing. However, later in the development-specific config, this is loosened slightly to make development feel more fluid.

_Quite an interesting discussion regarding different reporting options, how [eslint-loader](https://github.com/MoOx/eslint-loader) cancels the build and how to use the [eslint-loader](https://github.com/MoOx/eslint-loader) options can be found [here](https://github.com/MoOx/eslint-loader/issues/23)._

##### [Loaders](http://webpack.github.io/docs/configuration.html#module-loaders)

Loaders are the meat of Webpack. They take files, do stuff to them and output the result. Multiple loaders can run in turn on the same file, creating a similar pipe system as [Gulp](http://gulpjs.com/).

```JavaScript
{
  test: /.jsx?$/,
  loaders: ['babel'],
  include: SCRIPTS_DIR,
}
```

This loader runs [Babel](https://babeljs.io/) (via [babel-loader](https://github.com/babel/babel-loader)) across all the scripts. [Babel](https://babeljs.io/) handles converting our ES6 JS and JSX files into Javascript files that most browsers can understand. The settings for [Babel](https://babeljs.io/) are in `.babelrc` in the project root.

```JavaScript
resolve: {
  extensions: ['', '.js', '.jsx', '.scss', '.css'],
  root: [path.join(__dirname, 'app')],
  alias: {
    'foundation/scss': 'foundation-sites/scss',
  },
}
```

[`resolve`](http://webpack.github.io/docs/configuration.html#resolve) allows us to change how Webpack looks for and finds modules that we require.

- [`extensions`](http://webpack.github.io/docs/configuration.html#resolve-extensions) – This allows us to require/import files without needing to always provide an explicit extension.
- [`root`](http://webpack.github.io/docs/configuration.html#resolve-root) – __Absolute__ path to where our modules are stored. Saves us typing `app` in `import ... from './app/scripts/something.js`.
- [`alias`](http://webpack.github.io/docs/configuration.html#resolve-alias) – A lot can be done with `alias`, but we use it here to make it nicer to import styles from [Foundation](http://foundation.zurb.com/).

#### Development

We use the development-specific config when `npm start` is run or `webpack` is run from the command-line by itself. The options that differ from the common config are explained below.

```JavaScript
devtool: 'eval-source-map'
```

[`devtool`](https://webpack.github.io/docs/configuration.html#devtool) specifies which method is used to aid debugging (via source maps). We chose `eval-source-map` as it produces the most accurate (therefore useful) source maps and has relatively quick incremental build times (useful with hot reloading).

```JavaScript
devServer: {
  contentBase: PUBLIC_DIR,
  historyApiFallback: true,
  hot: true,
}
```

[`devServer`]() allows configuration of `webpack-dev-server`, which we use to build and serve the bundle during development.

  - [`contentBase`](http://webpack.github.io/docs/webpack-dev-server.html#content-base) – this is the root folder where the dev server will serve files from. In our boilerplate app, it just serves `index.html`.
  - [`historyApiFallback`](http://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli) – enables support for using the HTML5 history API so we can use nice URLs with [react-router histories](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#browserhistory).
  - [`hot`](http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement) – this is the first step in enabling full hot reloading (or hot module replacement).

_Note: More will be said about hot module replacement in a future section._

```JavaScript
entry: [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
]
```

Using [webpack-merge](https://www.npmjs.com/package/webpack-merge), these two entries will be added to the common config `entry` section. They are both needed in order for hot module replacement to work correctly.

You can either use `webpack/hot/only-dev-server` or `webpack/hot/dev-server` as the second entry. The difference between the two is that the path with `only` will never do a full page reload. If a module cannot be hot reloaded for some reason, a warning will be displayed in the console and you will need to reload the page yourself. This shouldn't happen too often and is usually better than the page reloading and your state lost without your control.


```JavaScript
output: {
  publicPath: 'http://localhost:8080' + config.output.publicPath,
}
```

The `output` is slightly different that the common config, due an [issue with relative paths in `blob://` files with Chrome](http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts). This is a problem when bundling icon fonts, referencing them from CSS and serving them `webpack-dev-server`.

##### [Loaders](http://webpack.github.io/docs/configuration.html#module-loaders)

```JavaScript
{
  test: /.s?css$/,
  loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
  include: STYLES_DIR,
}
```

This loader handles compiling and serving the CSS. It matches both `.css` and `.scss` files located in the stylesheets directory. The loaders being used are:

  1. [`sass-loader`](https://github.com/jtangelder/sass-loader) – This loader compiles our SCSS files.
  2. [`css-loader`](https://github.com/webpack/css-loader) – This loader simply resolves `@imports` and `url(...)` like `require()` statements, using Webpack's module resolver.
  3. [`style-loader`](https://github.com/webpack/style-loader) – This loader injects the compiled style bundle into the browser, rather than emitting a temporary `.css` file for development.

##### Plugins

Plugins allow you to extend the functionality of Webpack. The plugins used for development are as follows:

```JavaScript
new webpack.HotModuleReplacementPlugin()
```

This is required in combination with `devServer: { hot: true }` to enable hot module replacement in Webpack. More on this later.


```JavaScript
new BrowserSyncPlugin(
  {
    host: 'localhost',
    port: 3000,
    proxy: {
      target: 'http://localhost:8080',
      ws: true,
    },
    open: false,
  },
  {
    reload: false,
  }
)
```

This plugin allows us to use [BrowserSync](https://www.browsersync.io/) via ([browser-sync-webpack-plugin](https://www.npmjs.com/package/browser-sync-webpack-plugin)) in combination with hot module replacement.

The first hash passed to the plugin is the [BrowserSync options](http://www.browsersync.io/docs/options/) and the second is the [plugin options](https://www.npmjs.com/package/browser-sync-webpack-plugin#advanced).

  - `host` – The host to serve BrowserSync at.
  - `port` – The port to serve BrowserSync at.
  - `proxy:target` – The URL at which `webpack-dev-server` is serving at.
  - `proxy:ws` – We need to tell BrowserSync that our app is using WebSockets (for hot reloading) so that BrowserSync can adjust its execution.
  - `open` – This tells BrowserSync not to automatically open a new window every time the bundle is run.
  - `reload` – We turn off BrowserSyncs own reloading functionality, as we have that already with our hot reloading setup.

After running `npm start` the regular site will be available at [http://localhost:8080](http://localhost:8080) and the BrowserSync-enabled site will be available at [http://localhost:3000](http://localhost:3000).

```JavaScript
eslint: {
  emitWarning: true,
}
```

Finally we tell the [`eslint-loader`]() to always emit warnings (in Webpack's eyes) for linting problems (even if they are errors in the rules). This is so that we still get messages warning us about linting, but it won't stop the bundle from being built.

Lastly, we need to [add `react-hot-loader/patch` to the _front_ of the entries list](https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915#diff-efacb933fc2cf0fd7e8dacf55a958839L6) (or at least before any of our code), so we simply

```JavaScript
config.entry.unshift('react-hot-loader/patch');
```

#### Production

The production-specific config is used when running `npm build` and produces production ready assets in the `build/` folder.

##### [Loaders](http://webpack.github.io/docs/configuration.html#module-loaders)

```JavaScript
{
  test: /.s?css$/,
  loader: ExtractPlugin.extract(['css', 'postcss', 'sass']),
  include: STYLES_DIR,
}
```

This loader is slightly different from the development CSS loader, as it doesn't need to inject the styles into the page at run-time, but it does need to perform production transforms on the CSS. The loaders used are as follows:

  1. [`sass-loader`](https://github.com/jtangelder/sass-loader) – This loader compiles our SCSS files.
  2. [`postcss-loader`](https://github.com/postcss/postcss-loader) – This loader postproccess the compiled SCSS files, using [PostCSS](http://postcss.org/). The [PostCSS](http://postcss.org/) plugins are setup below.
  3. [`css-loader`](https://github.com/webpack/css-loader) – This loader simply resolves `@imports` and `url(...)` like `require()` statements, using Webpack's module resolver.

By default, Webpack will bundle all the CSS and JS _into the same file_. We want a separate `.css` file in our production build, so we use the [ExtractText](https://github.com/webpack/extract-text-webpack-plugin) plugin to extract all the CSS out of the final bundle and into a separate file. The settings for this are in the plugin section below.

##### Plugins #####

```JavaScript
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})
```

Using the [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) we can force [React to be built in production mode](https://facebook.github.io/react/downloads.html#npm). It does this by replacing every instance of `process.env.NODE_ENV` with `production` in the compiled bundle. This will make checks like

```JavaScript
if (process.env.NODE_ENV === 'production') {
  ...
}
```

always evaluate to `true`. Combined with dead-code removal in [UglifyJS](https://github.com/mishoo/UglifyJS2), this will produce a lean, minified, production version of React.

```JavaScript
new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  screwIe8: true,
  mangle: true,
})
```

This allows us to setup and use [UglifyJS](https://github.com/mishoo/UglifyJS2) to minify our JS code.

  - `compress:warnings` – This eliminates dead-code removal warnings from logs, which can become numerous in volume.
  - `screwIe8` – Since we don't need to support IE8, we can try and squeeze a few extra bytes out by not accomodating it.
  - `mangle` – This makes variable names shorter, saving space. Usually doesn't cause any problems, but can be configured to ignore certain variables if desired.

And finally...

```JavaScript
new ExtractPlugin('bundle.css')
```

This uses the [ExtractText](https://github.com/webpack/extract-text-webpack-plugin) plugin to extract all the CSS from the bundle into its own `bundle.css` file in the `build/` folder.

```JavaScript
eslint: {
  failOnError: true,
}
```

Here we tell the [eslint-loader](https://github.com/MoOx/eslint-loader) to cause the build to fail when linting fails (with an error, not a warning).

```JavaScript
postcss: function () {
  return [Csso];
}
```

Here we can setup the [PostCSS](http://postcss.org/) plugins. Currently we only use [csso](https://github.com/css/csso) but you could also add [AutoPrefixer](https://github.com/postcss/autoprefixer) here.

### Development Server

During development we use [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) to run a small server and serve the bundle. The bundle will be __served in memory__ and it will be available at the path specified in the configuration (with `output:publicPath`). Files that are _not_ in the bundle are served from the `public/` folder (specified with `devServer:contentBase`). This is just used to serve `index.html` in our basic app.

When working with a backend framework, such as Rails or Play, you can run the Rails server and the Webpack development server at the same time, using Webpack to serve only the bundle assets.

#### Hot Reloading (or Hot Module Replacement)

This is the holy-grail of live reloading: allowing only changes from a particular React component to be updated live on the page, whilst keep all of the application state. This is achieved with a combination of two modules:

  - [Webpack Hot Module Replacement](http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement)
  - [React Hot Loader](https://github.com/gaearon/react-hot-loader) (specifically the [v3 beta](https://github.com/gaearon/react-hot-loader/pull/240))

The reason we are using [React Hot Loader 3 Beta](https://github.com/gaearon/react-hot-loader/pull/240) is that it fixes a lot of issues with the previous versions and also supports React's [Stateless Function Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions). The beta is stable enough for development and is never used in production.

There is no specific documentation for the v3 beta yet, but [this commit](https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915) shows upgrading from v2 to v3 beta. You have to do a little more work yourself with this version, but it makes it a lot more flexible. I'll try and comment the relevant code below:

```JavaScript
import { AppContainer } from 'react-hot-loader';
import Routes from 'scripts/routes';

// Render the root component (<Routes />) intially, wrapped by the
// new <AppContainer>
ReactDOM.render(
  <AppContainer><Routes /></AppContainer>,
  document.getElementById('app')
);

// If hot reloading is enabled in Webpack...
if (module.hot) {
  // Accept any hot reloads affecting `scripts/routes.js` (including
  // any components it requires and renders etc.)
  module.hot.accept('scripts/routes', () => {
    // Re-import the updated component
    const HotRoutes = require('scripts/routes').default;

    // Render the updated component
    ReactDOM.render(
      <AppContainer><HotRoutes /></AppContainer>,
      document.getElementById('app')
    );
  });
}
```

`AppContainer` handles the main hot reloading functionality and [also displays React errors during development](https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915#commitcomment-17141693) (which is handy). In production, the code in the `if (module.hot)` block is removed by dead-code removal and the `<AppContainer />` is simply a wrapper node, so it is safe to leave in.

The last thing we need to do is [add a specific plugin to Babel](https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915#diff-ef7d6a6fa52bdbe4fe8a44fe3e5bdb5eR3), in `.babelrc`

```
"plugins": [
  "react-hot-loader/babel"
]
```

When you run the dev server, it will build the whole app once and serve the result. In the browser console you should see

    [HMR] Waiting for update signal from WDS...
    [WDS] Hot Module Replacement enabled.

After making a change to a module, you should see something like

    [WDS] App updated. Recompiling...
    [WDS] App hot update...
    [HMR] Checking for updates on the server...
    [HMR] Updated modules:
    [HMR]  - 395
    [HMR] App is up to date.

and in the server console you will see that it has compiled the module you changed.

If you have trouble with hot reloading, such as messages like

    The following modules couldn't be hot updated: (They would need a full reload!)

please [read this troubleshooting guide](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md).

##### Note about React Router

If using [React Router](https://github.com/reactjs/react-router), when making changes with hot reloading enabled you will see an error in the browser console that looks like this

    Warning: [react-router] You cannot change <Router routes>; it will be ignored

This warning usually means you have changed a route definition, which you can't do during run-time. However, this warning also gets triggered when updating a module with hot reloading but [you can safely ignore it](https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-211627184).

##### CSS Reloading

CSS reloading is handled by the default with hot module replacement plugin that comes with Webpack, so no extra configuration is required!

## Javascript

We write our Javascript code using the fairly new ES 6 Standard (with some things from ES 7 if we are feeling daring). [Babel](https://babeljs.io) converts all of this to regular ES 5 Javascript, so it will run in all modern browsers.

Here are some very nice resources on ES 6:

  - [ES 6 Features](https://github.com/lukehoban/es6features)
  - [Learn ES2015 with Babel](https://babeljs.io/docs/learn-es2015/)

This means we use things like the new [`import`](https://github.com/lukehoban/es6features#modules) syntax, [arrow functions](https://github.com/lukehoban/es6features#arrows), [`let` and `const`](https://github.com/lukehoban/es6features#let--const), [classes](https://github.com/lukehoban/es6features#classes), [enhanced object literals](https://github.com/lukehoban/es6features#enhanced-object-literals) and many more.

### Babel

Configuring Babel is done via `.babelrc` located in the root of the project. It is a pretty simple configuration, but each line is explained below:

```JSON
"presets": [
  "es2015",
  "react"
]
```

This lets you pick what kind of transforms Babel will make when compiling your code. We want to write using ES6 (ES2015), so we enable the [ES2015 preset](https://babeljs.io/docs/plugins/preset-es2015/) and also we want it to handle converting our JSX to JS, so we add the [`react` preset](https://babeljs.io/docs/plugins/preset-react/) too.

```JSON
"plugins": [
  "transform-class-properties",
  "react-hot-loader/babel"
]
```

As mentioned earlier, we need to include `react-hot-loader/babel` if we want to use Babel with hot module replacement. The [`transform-class-properties`](https://babeljs.io/docs/plugins/transform-class-properties/) plugin allows us to use an ES 7 feature, making class-based React components easier to write. More is said about this in the [React](#react) section below.

### Linting

In order to maintain consistent style throughout our Javascript code, we lint our source with [ESLint](http://eslint.org/). This is mainly because it is easy to lint JSX and React components (through plugins) as well as regular JS. There are many options and plugins available for ESLint, but the Airbnb preset [includes a lot of these for us](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

The ruleset we use is based on [Airbnb's style guide](https://github.com/airbnb/javascript). ESLint rules are [very](http://eslint.org/docs/rules/comma-dangle) [well](http://eslint.org/docs/rules/prefer-template) [documented](http://eslint.org/docs/rules/global-require), so if you get a linting error you can just [Google the rule tag](http://lmgtfy.com/?q=comma-dangle) and find out what's going on.

The configuration for ESLint is defined in the `.eslintrc` in the root of the project. A quick description follows.

```JSON
"extends": "airbnb"
```

This specifies that we are basing our rules on the [Airbnb preset](https://github.com/airbnb/javascript).

```JSON
"parser": "babel-eslint"
```

Occasionally, there is some syntax that Babel allows but ESLint doesn't understand. For those times, use [babel-eslint](https://github.com/babel/babel-eslint) as ESLint's parser. Currently, this is only needed because we use the [`transform-class-properties`](https://babeljs.io/docs/plugins/transform-class-properties/) plugin for Babel.

```JSON
"rules": {
  "no-console": 0
}
```

By default, Airbnb's rules disallow the use of `console.log()` in the code, but since we are using this linter during development, its a bit of a pain if it always complains. In production, we can add transforms to strip all `console.log()` or perhaps set this rule as a warning instead of disabling completely.

```JSON
"plugins": [
  "import",
],
"settings": {
  "import/resolver": "webpack"
}
```

This set of plugins and settings allow ESLint to lint our `import` and `require` statements, correctly using Webpacks built-in module resolver. This way it will catch typos in the import statements at the linting level. It uses the wonderful [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) package to achieve this magic.

## React

We try and use the most recent version of React as possible, getting all the improvements when they come. We also write all our components using JSX, instead of slightly awkward pure JS.

It is highly recommended to read the [official documentation](https://facebook.github.io/react/docs/getting-started.html) and [changelogs](https://facebook.github.io/react/blog/), to keep up-to-date with recent additions.

Again, we mainly follow [Airbnb's style guide](https://github.com/airbnb/javascript/tree/master/react) for React as well, so it is highly recommended to read and follow it. Some of the main, maybe new ideas if you haven't used much React, are as follows.

#### Stateless Function Components

If a component doesn't use any state or refs (i.e. it purely renders something based on the props it receives) you should use a [stateless function component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions). Rather than extending the usual `React.Component` or doing `React.createClass`, you can just return a single function

```JSX
function HelloMessage(props) {
  return <div>Hello {props.name}</div>;
}
```

This will then be available as a component called `HelloMessage` like

```JSX
ReactDOM.render(<HelloMessage name="Adam" />, mountNode);
```

In the near future, React will make specific performance optimisations for this type of component.

#### ES6 Classes (and some ES7)

We prefer to write our React components as ES6 classes. For example

```JSX
// good
class Listing extends React.Component {
  // ...
}
```

instead of

```JSX
// bad
const Listing = React.createClass({
  // ...
});
```

There is one 'drawback' to ES 6 classes which is that methods aren't bound automatically (like they are with `React.createClass`). For example

```JSX
React.createClass({
  onClickDiv() {
    // here `this` is bound correctly
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
});
```

`this` is automatically bound correctly in the above example, allowing you to access `this.state` etc. However, this isn't true with ES6 classes, so you have to take an extra step and bind the functions manually in the constructor

```JSX
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />
  }
}
```

However, we find this a little annoying to have to manually bind every function each time, so we use arrow functions combined with __ES 7__ class properties. This works due to two things:

  - ES 6 arrow functions preserve `this` context when they are called.
  - ES 7 class properties allow cleaner ways of defining a property of a class.

So you can now do this

```JSX
class extends React.Component {
  onClickDiv = () => {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />
  }
}
```

Here is a [good article](http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html) outlining the differences with the above methods.

_Note: ES 7 class properties are a stage-0 proposal, so are not yet part of the official standard. However, you can still use them now with Babel (using the [`transform-class-properties`](https://babeljs.io/docs/plugins/transform-class-properties/) plugin)._

Another nice thing about ES 7 [class properties and static fields](https://github.com/jeffmo/es-class-fields-and-static-properties) is that you can define `propTypes` and the initial `state` in a much cleaner manner. Observe.

```JSX
class extends React.Component {
  static propTypes = {
    message: React.PropTypes.string,
  };

  state = {
    // Start the counter at 0!
    counter: 0,
  };

  render() {
    // ...
  }
}
```

This is [also described](http://egorsmirnov.me/2015/06/14/react-and-es6-part2.html#bringing-es7-into-the-project) in the same article as mentioned above.

#### Naming

We mostly follow the [Airbnb naming style](https://github.com/airbnb/javascript/tree/master/react#naming), but there are a few differences.

- __Extensions__: Use `.jsx` extension for React components.
- __Filename__: Use lowercase with underscores separating individual words e.g. `reservation_card.jsx`.
- __Reference Naming__: Use PascalCase for React components and camelCase for their instances.

```JSX
// bad
import reservationCard from './reservation_card';

// good
import ReservationCard from './reservation_card';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- __Component Naming__: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:

```JSX
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```

### React Linting

The reason we picked [ESLint](http://eslint.org/) is that it has great support for linting React and JSX files, through plugins (the Airbnb preset [already includes everything for us](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)). Similarly with JS, we use [Airbnb's React style guide](https://github.com/airbnb/javascript/blob/master/react/README.md). The linting takes place at the same time as the JS, so running `npm lint` or during development with Webpack will lint the React code.

## Testing

_TODO Add more stuff here_

  - [Mocha](https://mochajs.org/)
  - [Enzyme](http://airbnb.io/enzyme/)
