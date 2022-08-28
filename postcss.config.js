// @ts-check

/**
 * @type {import('postcss-load-config').Config} PostCSSConfig
 */
const PostCSSConfig = {
  plugins: [
    require('autoprefixer')(),
    require('@fullhuman/postcss-purgecss')({
      content: ['./*.html', './src/**/*.js'],
      safelist: {
        greedy: [/^photograph.*/],
      },
    }),
  ],
};

module.exports = PostCSSConfig;
