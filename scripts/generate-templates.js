const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mjml2html = require('mjml')

// see https://handlebarsjs.com/precompilation.html for more details
glob.sync('views/emails/**/html.mjml').forEach(mjmlFile => {
  fs.readFile(mjmlFile, (err, mjml) => {
    // prettier doesn't support hbs, so we need to manually format it
    const { html } = mjml2html(mjml.toString(), { beautify: true })
    const htmlFile = path.join(path.dirname(mjmlFile), 'html.hbs')
    fs.writeFile(htmlFile, html, err =>
      console.log(`${mjmlFile} => ${htmlFile}`)
    )
  })
})
