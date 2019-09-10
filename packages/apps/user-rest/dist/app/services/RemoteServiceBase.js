"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@micro-fleet/common");
/**
 * Provides base methods to make remote service calls.
 */
let RemoteServiceBase = class RemoteServiceBase {
    constructor($MODULE_NAME, $rpcCaller) {
        this.$MODULE_NAME = $MODULE_NAME;
        this.$rpcCaller = $rpcCaller;
    }
    async $call(action, request, ResponseClass) {
        const rpcRes = await this.$rpcCaller.call({
            moduleName: this.$MODULE_NAME,
            actionName: action,
            params: request,
        });
        if (rpcRes.isSuccess) {
            return ResponseClass.from(rpcRes.payload);
        }
        return Promise.reject(rpcRes.payload);
    }
};
RemoteServiceBase = __decorate([
    common_1.decorators.injectable(),
    __param(0, common_1.decorators.unmanaged()),
    __param(1, common_1.decorators.unmanaged()),
    __metadata("design:paramtypes", [String, Object])
], RemoteServiceBase);
exports.RemoteServiceBase = RemoteServiceBase;
//# sourceMappingURL=RemoteServiceBase.js.map