# Scafolding for RPC micro services with [MicroFleet](https://github.com/gennovative/micro-fleet) framework

---
## COMPILING SOURCE CODE

- First of all, run `npm install`: To install dependencies.
- Service settings can be customized each service package in `packages/apps/{SERVICE NAME}/src/app/configs.ts`
- Run `npm run build` to transpile ALL packages.

## SETUP DATABASE
This scafolding uses PostgreSQL as default, you can change database engine in `_database/knexfile.js`. If you don't already have PostgreSQL installed, the quickest way is run a Docker image:

  ```bash
  docker run -d -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:11-alpine
  ```

We use database migration file for more fine-grained control of table creation:

- `cd _database`
- `npx knex migrate:latest` to create tables for development.
- `npx knex seed:run` to insert seed data.

- To re-run migration, go to database then delete all rows in table `knex_migrations.`

## SETUP RabbitMQ

- If you don't already have RabbitMQ installed, the quickest way is run a Docker image, including the management board:

  ```bash
  docker run -d -p 15672:15672 -p 5672:5672 rabbitmq:3.7-management-alpine
  ```

- Open webpage at URL `http://localhost:15672` and login with username/password `guest/guest`.

## RUN AND TEST SERVICES
- Please refer to each service's `README.md` in `packages/apps` for more details.

## FAQ

### How was this project initialized?

In case you want to start a new monorepo like this one. This project structure is inspired from [lerna-yarn-workspaces-example](https://github.com/Quramy/lerna-yarn-workspaces-example) but added some customizations:

* The major task runner is `npm run` or `yarn run`, with `scripts` section in `package.json`, as inspired from [how-to-use-npm-as-a-build-tool](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)

