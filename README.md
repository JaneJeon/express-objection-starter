# Express Objection starter

[![CircleCI](https://circleci.com/gh/JaneJeon/express-objection-starter.svg?style=shield)](https://circleci.com/gh/JaneJeon/express-objection-starter) [![npm version](https://badge.fury.io/js/express-objection-starter.svg)](https://badge.fury.io/js/express-objection-starter)

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

To get started, [check out the documentation](https://github.com/JaneJeon/express-objection-starter/wiki) for more details!
