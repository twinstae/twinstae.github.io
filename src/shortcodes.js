var keyword_tooltip = require("./keyword_tooltip.js");
/**
 * Shortcodes are a useful way of making content that lives in a CMS or in markdown files dynamic.
 *
 * By default, Elder.js ships with a {{svelteComponent name="" props="" options="" /}} shortcode.
 * Try adding a clock to one of your markdown files with:
 * `{{svelteComponent name="Clock" options='{"preload":true}' props='{"foo": true}' /}}`
 *
 */

module.exports = [
  {
    shortcode: "githubNewRepoButton",
    run: async ({ props, content}) => {
      return `
      <a href="https://github.com/new" target="_blank" style="padding: 4px; background-color: green; border-radius: 4px; color: white; border-color: transparent">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" style="color: white;">
          <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
        </svg>
      New
      </a>`
    }
  },
  keyword_tooltip,
  {
    /**
     * This is a simple shortcode that will wrap content with a magical box.
     * Try adding `{{box class="yellow"}}Your content here{{/box}}` in one of your markdown files.
     * */
    shortcode: 'box',
    run: async ({ content, props }) => {
      return {
        // this is what the shortcode is replaced with. You CAN return an empty string.
        html: `<div class="box ${props.class}">${content}</div>`,

        // This is added to the page's css through the cssStack. You probably want an external css file for most usecases.
        css: '.box{border:1px solid red; padding: 1rem; margin: 1rem 0;} .box.yellow {background: lightyellow;}',

        // Javascript that is added to the footer via the customJsStack.
        js: '<script>var test = true;</script>',

        // Arbitrary HTML that is added to the head via the headStack
        head: '<meta test="true"/>',
      };
    },
  },

  /**
   *
   * A common issue with static content is that someone will need to go back and update that content.
   * * Imagine you have your content in a CMS such as WordPress, Contentful, Prismic, or even a markdown file.
   * * Within this content some "decision maker" has decided that you need to display the number of pages on your site... and it always has to be accurate.
   *
   * Usually pulling this off would require you to put a placeholder like {{numberOfPages /}} and then preprocessing the content, counting the number of pages, and then rendering it.
   *
   * With Elder.js shortcodes, all the preprocessing is done for you, you just need to decide what you want to replace it with.
   *
   * Below is code for the usecase above.
   *
   * It is important to note, even if you wanted {{latestInstagramPhoto /}} to be shown, the same approach would apply. Just use something like
   * `node-fetch` to hit Instagram's API and specify what html, css, js you'd like to add to the page.
   *
   * */

  {
    shortcode: 'numberOfPages',
    run: async ({ allRequests }) => {
      // allRequests represents 'request' objects for all of the pages of our site, if we know the length of that we know the length of our site.
      return {
        html: allRequests.length,
        // other values can be omitted.
      };
    },
  },
];
