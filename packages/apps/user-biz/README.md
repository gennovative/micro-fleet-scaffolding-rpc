# Scafolding for internal business service with [MicroFleet](https://github.com/gennovative/micro-fleet) framework

Business service (or biz service for short) is internal of a system and only accepts requests from other internal ones.

---

## COMPILING SOURCE CODE

- First of all, run `npm install`: To install dependencies.
- Service settings can be customized in `src/app/configs.ts`
- Run `npm run build` to transpile TypeScript to JavaScript, or `npm run watch` to keep watching and transpiling changes in files.

## RUN AND TEST

- Run `npm run dev` to bootstrap the service in debug mode, errors are logged to console as well as returned to client-side.
- Run `npm start` to start service in production mode, errors are not logged and client-side only receives validation errors.

- Call service via HTTP (Direct RPC):
  * Endpoint: `http://localhost:{port}/{module}/{action}`.
  
    (Try this: `http://localhost:8080/mcftUserManagement/getList`)

  * Method: `POST`
  * Header `Content-Type: application/json`
  * Request body format:
    ```json
	{
		"from": string (Optional),
		"to": string (Optional),
		"payload": JSON (Required)
	}
    ```
	Try this
    ```json
	{
		"payload": {
			"pageIndex": 1,
			"pageSize": 10
		}
	}
    ```

- Call service via RabbitMQ (Mediate RPC):
  * Message payload format:
    ```json
	{
		"from": this.name,
		"to": moduleName,
		"payload": params,
	}
    ```
	It's hard, don't try it manually. You are adviced to run the REST service.
  * Exchange: `amq.topic`
  * Routing Key AMQP: `request.{module}.{action}`

    E.g: `request.mcftUserManagement.getList`

  * Message properties:
    - "reply_to": "response.mcftUserManagement.getList@{your random unique string}"
    - "correlation_id": "{the above random unique string}"
    - "content_type": "application/json"


## RELEASE

- Jump to script folder: `cd ./_docker`
- Create Docker image: `sudo sh ./create-image.sh`
- Deploy services to Docker swarm: `sudo sh ./deploy.sh`
- Remove services from Docker swarm: `sudo sh ./undeploy.sh`