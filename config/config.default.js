module.exports = {
  boot: new Date(),
  port: 3000,
  timeout: 60 * 1000, // 1 minute, in milliseconds
  requestIdHeader: 'X-Request-Id',
  // https://expressjs.com/en/guide/behind-proxies.html
  // https://github.com/florianheinemann/express-sslify
  proxy: false,
  logger: {
    options: {
      level: 'debug',
      prettyPrint: {
        translateTime: true,
        ignore: 'pid,hostname,boot'
      }
    }
  },
  session: {
    // copy+paste the output of the following command to replace secret in production:
    // node -p "require('nanoid')(24)"
    secret: 'nyaa',
    cookie: {
      sameSite: 'lax', // CSRF protection
      maxAge: 86400 * 1000, // 1 day, in milliseconds
      rememberMe: 2592000 * 1000 // 30 days, in milliseconds
    },
    resave: false,
    rolling: true,
    saveUninitialized: false // GDPR compliance
  },
  ratelimit: {
    windowMs: 900 * 1000, // 15 minutes, in milliseconds
    max: 0
  },
  redis: {
    url: 'redis://localhost'
  },
  database: {
    // https://knexjs.org/#Installation-node
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/app',
    debug: true
  },
  passport: {},
  mail: {
    smtp: {
      // services available at: https://nodemailer.com/smtp/well-known
      // for maildev, we don't need credentials
      service: 'maildev'
    },
    defaults: {
      from: 'test@example.com'
    }
  }
}
