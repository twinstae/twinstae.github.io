require('dotenv').config();
const frontmatter = require('remark-frontmatter');
const extractFrontmatter = require('remark-extract-frontmatter');
const yaml = require('yaml');
const remarkSlug = require('remark-slug');
const remarkHtml = require('remark-html');

module.exports = {
  origin: 'https://twinstae.github.io', // TODO: update this.
  lang: 'ko-KR',
  srcDir: 'src',
  distDir: 'docs',
  rootDir: process.cwd(),
  build: {},
  prefix: '', // If you want your site to be built within a sub folder within your `distDir` you can use this.
  server: {},
  props: {
    hydration: 'hybrid',
    compress: false,
  },
  debug: {
    stacks: false, // output details of the stack consolidation process.
    hooks: false, // outputs the details of each hook as they are run.
    performance: false, // outputs a full performance report of how long it took to run each page.
    build: false, // gives additional details about the build process.
    automagic: false,
  },
  hooks: {
    // disable: ['elderWriteHtmlFileToPublic'], // this is used to disable internal hooks. Uncomment this hook to disabled writing your files during build.
  },
  plugins: {
    '@elderjs/plugin-markdown': {
      routes: ['blog', 'review'],
      remarkPlugins: [
        frontmatter, // 'remark-frontmatter' package
        [extractFrontmatter, { name: 'frontmatter', yaml: yaml.parse }], // 'remark-extract-frontmatter' and 'yaml' packages.
        remarkSlug, // 'remark-slug' package
        [remarkHtml, { sanitize: false }], // 'remark-html' package
      ],
      useSyntaxHighlighting: {
        theme: 'material-palenight',
      },
      useTableOfContents: true,
    },
    '@elderjs/plugin-sitemap': {
      origin: 'https://twinstae.github.io', // the https://yourdomain.com
      exclude: [], // an array of permalinks or permalink prefixes. So you can do ['500'] and it will match /500**
      routeDetails: {
        home: {
          priority: 1.0,
          changefreq: 'weekly',
        },
        blog: {
          priority: 0.8,
          changefreq: 'monthly',
        },
      }, // set custom priority and change freq if not it falls back to default
      lastUpdate: {}, // configurable last update for each route type.
    },
  },
  shortcodes: { closePattern: '}}', openPattern: '{{' },
};
