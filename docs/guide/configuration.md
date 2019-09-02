# Configuration

## Rationale

When configuring your microservices, you want to be able to change the settings _without_ having to re-deploy your applications. This is typically done with environment variables, and that is why most node.js projects use something like `dotenv` to configure their projects.

That works great, except you run into a couple of problems as your project scales up:

1. Normally you only "inject" environment variables via the `.env` file, but how do you support multiple environments (staging/test/development/production)?
2. Typically there's only one entry point for the `dotenv` module - in the `app.js` file. But how can you ensure that the right environment variables are loaded even from CLIs (such as `knex`)?
3. `dotenv` only ingests from one file, so how do you configure "defaults"? And if you have a `.env.example` file, how do you "sync" the settings from one file to another as they are updated?
4. Environment variables are great for strings, but how do you support numbers/booleans/etc?
5. Perhaps most importantly, configuring all of your app's dependencies becomes tricky when you can only have key-pair variables, especially for modules that require you to inject an "options" object, often hierarchical in nature.

## The Stack

- `nconf` for hierarchical configuration using different sources - JSON files, command-line arguments, environment variables, etc.
- `yamljs` because writing YAML is so much easier than writing JSON

## Sources and Priorities

`nconf` can read from multiple configuration files, and the order/the way in which they're loaded affects which variable value is chosen in case of conflict. As you can see in `config/index.js`, the order is as follows:

1. command-line arguments (so that you don't have to modify environment variables or npm scripts)
2. environment variables. Notably, we're relying on `nodemon`/`jest`/`pm2`/`Heroku` for the `NODE_ENV` variable. `nodemon` reads and injects the `NODE_ENV=development` defined in `package.json`, `jest` loads `NODE_ENV=test` by default, `pm2` loads `NODE_ENV=production` defined in `pm2.config.js`, and `Heroku`'s default node buildpack injects `NODE_ENV=production`.
3. default configuration defined in `config/environments/default.json`. Note that the JSON files are automatically generated from their corresponding YAML files, so edit the YAML files instead and run `yarn lint:all:yaml` to compile!
4. environment-specific files defined in `config/environments/${NODE_ENV}.json`. When running CLI programs (like `knex`), `NODE_ENV` will not be defined, meaning it falls back to the default variables. Otherwise, the appropriate configuration for the environment will be loaded.
5. schema/relations/ACL configurations. See the [authorization page](https://github.com/JaneJeon/express-objection-starter/wiki/Authorization) or [JSONschema page](https://github.com/JaneJeon/express-objection-starter/wiki/JSON-Schema) for more details.

## AWS

If you want to load AWS credentials, you can do so by making the file `~/.aws/credentials` (which is also used by the AWS CLI, so the chances are, you already have it!). If you're running the code in EC2/Lambda execution environments, then the appropriate credentials (defined by your IAM policy) will be injected via environment variables.

In short, don't worry about manually setting AWS configurations!
