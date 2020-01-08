<h1 align="center">Welcome to express-objection-starter 👋</h1>

[![GitHub Actions](https://github.com/JaneJeon/express-objection-starter/actions)](https://github.com/JaneJeon/express-objection-starter/workflows/Node%20CI/badge.svg)
[![Coverage](https://codecov.io/gh/JaneJeon/express-objection-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/JaneJeon/express-objection-starter)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/JaneJeon/express-objection-starter)](https://codeclimate.com/github/JaneJeon/express-objection-starter/maintainability)
[![Dependencies](https://img.shields.io/david/JaneJeon/express-objection-starter)](https://david-dm.org/JaneJeon/express-objection-starter)
[![devDependencies](https://img.shields.io/david/dev/JaneJeon/express-objection-starter)](https://david-dm.org/JaneJeon/express-objection-starter?type=dev)
[![Vulnerabilities](https://snyk.io//test/github/JaneJeon/express-objection-starter/badge.svg?targetFile=package.json)](https://snyk.io//test/github/JaneJeon/express-objection-starter?targetFile=package.json)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=JaneJeon/express-objection-starter)](https://dependabot.com)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/JaneJeon/express-objection-starter/blob/master/LICENSE)
[![Surge Docs](https://img.shields.io/badge/docs-surge.sh-yellowgreen)](https://objection.surge.sh)
[![Netlify Docs](https://img.shields.io/badge/docs-netlify-blue)](https://objection.netlify.com)
[![Standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Deploy to Heroku](https://img.shields.io/badge/deploy%20to-heroku-6762a6)](https://heroku.com/deploy)

> an opinionated, production-ready, isomorphic express/knex/objection starter with centralized configuration

### 🏠 [Homepage](https://github.com/JaneJeon/express-objection-starter)

## Why?

While node.js makes it easy to hack together an express server quickly, it's hard to _actually_ build a production-ready, secure, scalable solution. Furthermore, when building a web app that has a backend and a frontend component, you end up having to repeat almost all of the logic.

Thus, based on my experience building production-level systems, I built a comprehensive express.js template with:

- a centralized hierarchical configuration system that can be easily overwritten
- sensible defaults that can suit any production environment - PaaS, containers, behind proxy/CDN, etc, with support for production logging and distributed tracing
- a proper ORM and query builder (Objection.js + knex) to allow working with relational databases in an ergonomic way
- extensible relational models with tons of features (e.g. validation and pagination) baked-in
- secure authentication system with Active Session management features
- fine-grained role-based authorization to control access down to the field level, that seamlessly integrates with the query builder
- a scalable, fault-tolerant queuing system that takes advantage of multi-core CPUs
- fully-loaded development environment with automated testing/migration/dependencies/linting via git & npm hooks, development-purpose mail server, and even automatic type generation!

To get started, [check out the documentation](https://objection.netlify.com) for more details!

## Install

When you create a GitHub repo, you can either select `express-objection-starter` as the starting template, or you can start by cloning this repo:

```sh
git clone https://github.com/JaneJeon/express-objection-starter.git
rm -rf .git
```

## Run tests

```sh
yarn test
```

## Author

👤 **Jane Jeon**

- Github: [@JaneJeon](https://github.com/JaneJeon)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check [issues page](https://github.com/JaneJeon/express-objection-starter/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Jane Jeon](https://github.com/JaneJeon).  
This project is [MIT](copy) licensed.
