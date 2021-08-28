const { hookInterface, hookEntityDefinitions } = require('@elderjs/elderjs');

module.exports = {
  all: () => [{ slug: '/lec/' }],
  permalink: '/lec/',
  data: ({ data }) => {
    data.hookInterface = hookInterface;
    data.hookEntityDefinitions = hookEntityDefinitions;
    return data;
  },
};
