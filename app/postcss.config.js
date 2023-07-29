const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const tailwindcssImport = require('tailwindcss')
const autoprefixerImport = require('autoprefixer')
// cssnano  https://www.cssnano.cn/docs/introduction/
module.exports = {
  plugins: [
    autoprefixerImport,
    tailwindcssImport,
    postcssPresetEnv({ browsers: ['defaults', 'not IE 11'] }),
    postcssImport
  ]
}
