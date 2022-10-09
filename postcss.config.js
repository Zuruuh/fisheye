// @ts-check

/**
 * @type {import('postcss-load-config').Config} PostCSSConfig
 */
const PostCSSConfig = {
  plugins: [require('autoprefixer')()],
};

module.exports = PostCSSConfig;
