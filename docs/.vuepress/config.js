const fs = require('fs')
const naturalSort = require('string-natural-compare')
const { version } = require('../../package')

module.exports = {
  title: 'Express Objection Starter v' + version,
  description: 'an express.js app template with objection.js integration',
  // fuck this, I'm not deploying to github pages
  // base: '/express-objection-starter',

  themeConfig: {
    repo: 'JaneJeon/express-objection-starter',
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: 'Last Updated',

    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'Swagger',
        link: 'https://www.npmjs.com/search?q=swagger' // TODO:
      }
    ],

    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: fs
            .readdirSync('docs/guide')
            .filter(doc => doc.toLowerCase() !== 'readme.md')
            .sort(naturalSort)
        }
      ]
    }
  }
}
