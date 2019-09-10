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
/// <reference types="debug" />
const debug = require('debug')('scaffold:svc:user');
// import { cacheable } from '@micro-fleet/cache'
const common_1 = require("@micro-fleet/common");
const service_communication_1 = require("@micro-fleet/service-communication");
const dto = require("../contracts/dto/user");
const RemoteServiceBase_1 = require("./RemoteServiceBase");
const { Action: A, } = dto;
let RemoteUserService = class RemoteUserService extends RemoteServiceBase_1.RemoteServiceBase {
    constructor(rpcCaller) {
        super(dto.MODULE_NAME, rpcCaller);
        debug('RemoteUserService instantiated');
    }
    /**
     * @see IUserService.create
     */
    create(request) {
        return this.$call(A.CREATE, request, dto.CreateUserResponse);
    }
    /**
     * @see IUserService.edit
     */
    edit(request) {
        return this.$call(A.EDIT, request, dto.EditUserResponse);
    }
    /**
     * @see IUserService.hardDeleteSingle
     */
    hardDeleteSingle(request) {
        return this.$call(A.HARD_DELETE, request, dto.DeleteUserResponse);
    }
    /**
     * @see IUserService.hardDeleteMany
     */
    hardDeleteMany(request) {
        return this.$call(A.HARD_DELETE, request, dto.DeleteUserResponse);
    }
    /**
     * @see IUserService.getById
     */
    getById(request) {
        return this.$call(A.GET_BY_ID, request, dto.GetSingleUserResponse);
    }
    /**
     * @see IUserService.getActiveList
     */
    async getActiveList(request) {
        return this.$call(A.GET_ACTIVE_LIST, request, dto.GetUserListResponse);
    }
    /**
     * @see IUserService.getList
     */
    // @cacheable('userSvc:getList')
    getList(request) {
        return this.$call(A.GET_LIST, request, dto.GetUserListResponse);
    }
};
RemoteUserService = __decorate([
    __param(0, common_1.decorators.inject(service_communication_1.Types.MEDIATE_RPC_CALLER)),
    __metadata("design:paramtypes", [Object])
], RemoteUserService);
exports.RemoteUserService = RemoteUserService;
//# sourceMappingURL=RemoteUserService.js.map