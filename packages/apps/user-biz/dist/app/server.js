"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("@micro-fleet/cache");
const id_generator_1 = require("@micro-fleet/id-generator");
const microservice_1 = require("@micro-fleet/microservice");
const persistence_1 = require("@micro-fleet/persistence");
const service_communication_1 = require("@micro-fleet/service-communication");
const Types_1 = require("./constants/Types");
const UserService_1 = require("./services/UserService");
const UserRepository_1 = require("./repositories/UserRepository");
class App extends microservice_1.MicroServiceBase {
    /**
     * @override
     */
    $registerDependencies() {
        super.$registerDependencies();
        const dc = this._depContainer;
        dc.bind(Types_1.Types.USER_REPO, UserRepository_1.UserRepository).asSingleton();
        dc.bind(Types_1.Types.USER_SVC, UserService_1.UserService).asSingleton();
    }
    /**
     * @override
     */
    $onStarting() {
        super.$onStarting();
        this.attachAddOn(cache_1.registerCacheAddOn());
        this.attachAddOn(persistence_1.registerDbAddOn());
        this.attachAddOn(id_generator_1.registerIdAddOn());
        this.attachAddOn(service_communication_1.registerMessageBrokerAddOn());
        // If no error handler is registered to RPC handler
        // Uncaught errors will be thrown as normal exceptions.
        const serviceOnError = this.$onError.bind(this);
        let rpcHandler = service_communication_1.registerMediateHandlerAddOn();
        rpcHandler.onError(serviceOnError);
        this.attachAddOn(rpcHandler);
        rpcHandler = service_communication_1.registerDirectHandlerAddOn();
        rpcHandler.onError(serviceOnError);
        this.attachAddOn(rpcHandler);
    }
}
new App().start().catch(console.error);
//# sourceMappingURL=server.js.map