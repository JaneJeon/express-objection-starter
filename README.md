# Express Objection starter

[![CircleCI](https://img.shields.io/circleci/build/github/JaneJeon/express-objection-starter)](https://circleci.com/gh/JaneJeon/express-objection-starter) [![codecov](https://codecov.io/gh/JaneJeon/express-objection-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/JaneJeon/express-objection-starter) [![Maintainability](https://api.codeclimate.com/v1/badges/61db6d107fc76f47751f/maintainability)](https://codeclimate.com/github/JaneJeon/express-objection-starter/maintainability) [![npm](https://img.shields.io/npm/v/express-objection-starter)](https://www.npmjs.com/package/express-objection-starter) [![npm](https://img.shields.io/npm/dt/express-objection-starter)](https://www.npmjs.com/package/express-objection-starter) [![install size](https://packagephobia.now.sh/badge?p=express-objection-starter)](https://packagephobia.now.sh/result?p=express-objection-starter) [![David](https://img.shields.io/david/JaneJeon/express-objection-starter)](https://david-dm.org/JaneJeon/express-objection-starter) [![Known Vulnerabilities](https://snyk.io//test/github/JaneJeon/express-objection-starter/badge.svg?targetFile=package.json)](https://snyk.io//test/github/JaneJeon/express-objection-starter?targetFile=package.json) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=JaneJeon/express-objection-starter)](https://dependabot.com) [![NPM](https://img.shields.io/npm/l/express-objection-starter)](https://github.com/JaneJeon/express-objection-starter/blob/master/LICENSE) [![Docs](https://img.shields.io/badge/docs-surge.sh-yellowgreen)](https://objection.surge.sh) [![Docs](https://img.shields.io/badge/docs-netlify-blue)](https://objection.netlify.com) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
