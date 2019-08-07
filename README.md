# Express Objection starter

While node.js makes it easy to hack together an express server quickly, it's hard to _actually_ build a production-ready, secure, scalable solution.

Thus, based on my experience building production-level systems, I built a comprehensive express template with:

- a proper ORM and query builder (Objection.js + knex) setup to avoid n+1 problems
- extensible relational models with validation and pagination baked-in
- secure authorization & authentication system (Active Sessions)
- a scalable, fault-tolerant queuing system that takes advantage of multi-core CPUs
- a flexible configuration system with sensible defaults
- fully-loaded development environment with git hooks, linting, and even development-purpose mail servers
- a production setup that is suited for PaaS, container, or cloud environment

-- WIP --
