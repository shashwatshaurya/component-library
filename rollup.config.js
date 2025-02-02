const resolve = require('@rollup/plugin-node-resolve');
const fs = require('fs');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
// const generateThemePlugin = require('./rollup-plugin-generate-theme.js');

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve.default(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      extract: true,
      minimize: true,
      modules: false,
    }),
    terser(),
    // generateThemePlugin({
    //   themeConfigPath: './theme.config.js',
    //   outputPath: './src/theme.css',
    // }),
  ],
  external: ['react', 'react-dom'],
};
