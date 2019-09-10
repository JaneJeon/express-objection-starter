---
home: true
heroText: Express Objection Starter
tagline: A feature-packed Node.js server template with Express + Objection integration built-in
actionText: Get Started →
actionLink: /guide/
features:
  - title: Objection + Knex.js Integration
    details: 'TODO:'
  - title: Powerful Configuration
    details: sensible defaults, 'TODO:'
  - title: Production-Ready
    details: easy deployment, 'TODO:'
  - title: Developer Ergonomics
    details: 'TODO:'
  - title: Secure Authentication & Authorization
    details: 'TODO:'
  - title: Single Source of Truth
    details: 'TODO:'
footer: MIT Licensed | Copyright © 2019-present Jane Jeon
---

While node.js makes it easy to hack together an express server quickly, it's hard to _actually_ build a production-ready, secure, scalable solution. Furthermore, when building a web app that has a backend and a frontend component, you end up having to repeat almost all of the logic.

Thus, based on my experience building production-level systems, I built a comprehensive express.js template with:

- a centralized hierarchical configuration system that can be easily overwritten
- sensible defaults that can suit any production environment - PaaS, containers, behind proxy/CDN, etc, with support for production logging and distributed tracing
- a proper ORM and query builder (Objection.js + knex) to allow working with relational databases in an ergonomic way
- extensible relational models with tons of features (e.g. validation and pagination) baked-in
- secure authentication system with Active Session management features
- fine-grained role-based authorization to control access down to the field level, that seamlessly integrates with the query builder
- a scalable, fault-tolerant queuing system that takes advantage of multi-core CPUs
- fully-loaded development environment with git and npm hooks (automated testing/migration/dependencies/linting), development-purpose mail servers, and even automatic type generation for models!
