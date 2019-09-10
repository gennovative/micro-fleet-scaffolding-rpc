# Scafolding for BFF RESTful service with [MicroFleet](https://github.com/gennovative/micro-fleet) framework


Backend-for-frontend (BFF) REST service accepts requests from external clients. It doesn't process business logic itself but publishes the requests to message queue then waits for results from the queue and responds to clients.


---
## COMPILING SOURCE CODE

- First of all, run `npm install`: To install dependencies.
- Service settings can be customized in `src/app/configs.ts`
- Run `npm run build` to transpile TypeScript to JavaScript, or `npm run watch` to keep watching and transpiling changes in files.
- Run `npm run dev` to bootstrap the service in debug mode, errors are logged to console as well as returned to client-side.
- Run `npm start` to start service in production mode, errors are not logged and client-side only receives validation errors.

## RUN AND TEST

Make sure **both** User Biz and User Rest services are running. Here are HTTP endpoints you can test with:
* Content-Type: application/json
* Base URL: `http://localhost:3000/api/v1/users`

1. Get paged list:

    - `GET {Base URL}`
    - `GET {Base URL}?pageIndex=1&pageSize=10&sortBy=name&sortType=desc`

1. Get one:

    - `GET {Base URL}/8259744598599926789`
    - `GET {Base URL}8259744598599926789?fields=id&fields=name`

1. Create:

    - `POST {Base URL}`
    ```json
	{
		"name": "Your name", // Required
		"status": "active" | "locked" | "deleted" // Optional
	}
	```

1. Edit:

    - `PATCH {Base URL}`
    ```json
	{
		"id": "8259744598599926789", // Required
		"name": "Your new name", // Optional
		"status": "active" | "locked" | "deleted" // Optional
	}
	```

1. Hard delete one:

    - `DELETE {Base URL}/8259744598599926789`

1. Hard delete many:

    - `DELETE {Base URL}?ids=8259744598599926789&ids=8259756591356576774`

## RELEASE

- Jump to script folder: `cd ./_docker`
- Create Docker image: `sudo sh ./create-image.sh`
- Deploy services to Docker swarm: `sudo sh ./deploy.sh`
- Remove services from Docker swarm: `sudo sh ./undeploy.sh`