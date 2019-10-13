#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mjml2html = require('mjml')

// see https://handlebarsjs.com/precompilation.html for more details
glob.sync('views/emails/**/html.mjml').forEach(mjmlFile => {
  fs.readFile(mjmlFile, (_, mjml) => {
    const { html } = mjml2html(mjml.toString())
    const htmlFile = path.join(path.dirname(mjmlFile), 'html.hbs')
    fs.writeFile(htmlFile, html, () =>
      // eslint-disable-next-line no-console
      console.log(`${mjmlFile} => ${htmlFile}`)
    )
  })
})
