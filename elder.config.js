require('dotenv').config();
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
      routes: ['blog'],
      useTableOfContents: true,
    },
    '@elderjs/plugin-browser-reload': {
      // this reloads your browser when nodemon restarts your server.
      port: 8080,
      reload: false, // if you are having issues with reloading not working, change to true.
    },
    '@elderjs/plugin-seo-check': {
      display: ['errors'] //, 'warnings'], // If the errors are too verbose remove 'warnings'
      //writeLocation: './report.json', // if you want to write a report of errors
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
        }
      }, // set custom priority and change freq if not it falls back to default
      lastUpdate: {}, // configurable last update for each route type.
    },
  },
  shortcodes: { closePattern: '}}', openPattern: '{{' },
};
