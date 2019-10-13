const pino = require('pino')
const path = require('path')
const config = require('../config')
const pick = require('lodash/pick')

const logger = pino(
  Object.assign(config.get('logger:options'), {
    serializers: {
      err: pino.stdSerializers.err,
      req: req => pick(req, config.get('logger:serializers').req),
      res: res => pick(res, config.get('logger:serializers').res)
    }
  })
).child({ script: path.basename(process.argv[1]) })

module.exports = logger
