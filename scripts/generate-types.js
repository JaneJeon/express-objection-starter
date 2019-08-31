#!/usr/bin/env node
const { compile } = require('json-schema-to-typescript')
const schema = require('../config/schema')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

Promise.all(
  Object.keys(schema).map(model =>
    compile(schema[model], model).then(ts => {
      writeFileSync(resolve(__dirname, '../models', `${model}.ts`), ts)
      console.log(`generated type definition for ${model}.js`)
    })
  )
)
