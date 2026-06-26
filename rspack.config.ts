import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import {NativeWindPlugin} from '@callstack/repack-plugin-nativewind';
import rspack from '@rspack/core';
import getSharedDependencies from './sharedDeps.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

const STANDALONE = Boolean(process.env.STANDALONE);

export default Repack.defineRspackConfig(({mode}) => {
  return {
    mode,
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions({enablePackageExports: true}),
      // Pin singleton-critical packages to this app's copy so the symlinked SDK
      // doesn't resolve a second physical instance (double-registers native
      // views, e.g. "two views named RCTText").
      alias: {
        react: path.join(__dirname, 'node_modules/react'),
        'react-native': path.join(__dirname, 'node_modules/react-native'),
        'react-native-svg': path.join(__dirname, 'node_modules/react-native-svg'),
        'react-native-css-interop': path.join(
          __dirname,
          'node_modules/react-native-css-interop',
        ),
        nativewind: path.join(__dirname, 'node_modules/nativewind'),
      },
    },
    output: {
      uniqueName: 'sas-news',
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {},
          },
          type: 'javascript/auto',
        },
        // `svg: 'svgr'` makes `.svg` imports compile to react-native-svg
        // components (via @svgr/webpack, native:true) — used for shared icons.
        ...Repack.getAssetTransformRules({inline: true, svg: 'svgr'}),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new NativeWindPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'news',
        filename: 'news.container.js.bundle',
        dts: false,
        exposes: {
          './App': './src/navigation/MainNavigator',
        },
        shared: {
          ...getSharedDependencies({eager: STANDALONE}),
          // Single shared counter store instance across mini-apps.
          'super-app-showcase-sdk/lib/counterStore': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: false,
          },
          // Share css-interop runtime (deep imports) so there is ONE NativeWind
          // StyleSheet registry across host + mini-apps. Prevents style overrides
          // and the "Cannot update a component while rendering" (CssInterop) warning.
          'react-native-css-interop/': {
            singleton: true,
            eager: STANDALONE,
            requiredVersion: '*',
          },
        },
      }),
      new Repack.plugins.CodeSigningPlugin({
        enabled: mode === 'production',
        privateKeyPath: path.join('..', '..', 'code-signing.pem'),
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
});
