"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("@micro-fleet/cache");
const microservice_1 = require("@micro-fleet/microservice");
const service_communication_1 = require("@micro-fleet/service-communication");
const web_1 = require("@micro-fleet/web");
const Types_1 = require("./constants/Types");
const RemoteUserService_1 = require("./services/RemoteUserService");
class App extends microservice_1.MicroServiceBase {
    /**
     * @override
     */
    $registerDependencies() {
        super.$registerDependencies();
        const dc = this._depContainer;
        dc.bind(Types_1.Types.USER_SVC, RemoteUserService_1.RemoteUserService).asSingleton();
    }
    /**
     * @override
     */
    $onStarting() {
        super.$onStarting();
        this.attachAddOn(cache_1.registerCacheAddOn());
        this.attachAddOn(web_1.registerWebAddOn());
        this.attachAddOn(service_communication_1.registerMessageBrokerAddOn());
        service_communication_1.registerMediateCaller();
    }
}
new App().start().catch(console.error);
//# sourceMappingURL=server.js.map