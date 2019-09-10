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
const debug = require('debug')('scaffold:ctrl:user');
const cm = require("@micro-fleet/common");
const { inject } = cm.decorators;
const service_communication_1 = require("@micro-fleet/service-communication");
const Types_1 = require("../constants/Types");
const dto = require("../contracts/dto/user");
const controller_util_1 = require("../utils/controller-util");
const { Action: A, MODULE_NAME, } = dto;
let UserController = class UserController {
    constructor(_userSvc) {
        this._userSvc = _userSvc;
        debug('UserController instantiated');
    }
    /*
    * Topic for all actions here:
    * `request.{MODULE_NAME}.{Action.NAME}`
    */
    /**
     * @example
     *
     * Request body for creating a single user:
     * {
     *	name: 'John Nemo'
     * }
     *
     * or
     *
     * {
     *	name: 'John Nemo',
     *	status: 'active'
     * }
     */
    create(request) {
        return this._userSvc.create(request);
    }
    /**
     * @example
     *
     * {
     *	id: '123498765',
     *	name: 'Nemo Doe'
     * }
     */
    edit(request) {
        return this._userSvc.edit(request);
    }
    /**
     * @example
     *
     * {
     *	id: '123498765'
     * }
     */
    getById(request) {
        return this._userSvc.getById(request);
    }
    /**
     * @example
     *
     * {
     *	pageIndex: 2,
     *	pageSize: 10,
     *	sortBy: 'name',
     *	sortType: 'desc'
     * }
     */
    getList(request) {
        return this._userSvc.getList(request);
    }
    /**
     * @example
     *
     * {
     *	pageIndex: 2,
     *	pageSize: 10,
     *	sortBy: 'name',
     *	sortType: 'desc'
     * }
     */
    getActiveList(request) {
        return this._userSvc.getActiveList(request);
    }
    /**
     * @example
     * {
     *	ids: ['123', '456', '678'],
     *	isAtomic: true
     * }
     */
    hardDelete(request) {
        return this._userSvc.hardDeleteMany(request);
    }
};
__decorate([
    service_communication_1.decorators.action(A.CREATE),
    __param(0, controller_util_1.trustPayload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.CreateUserRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    service_communication_1.decorators.action(A.EDIT),
    __param(0, controller_util_1.trustPayload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.EditUserRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "edit", null);
__decorate([
    service_communication_1.decorators.action(A.GET_BY_ID),
    __param(0, controller_util_1.trustPayload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.GetUserByIdRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getById", null);
__decorate([
    service_communication_1.decorators.action(A.GET_LIST),
    __param(0, controller_util_1.trustPayload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.GetUserListRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getList", null);
__decorate([
    service_communication_1.decorators.action(A.GET_ACTIVE_LIST),
    __param(0, controller_util_1.trustPayload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.GetUserListRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getActiveList", null);
__decorate([
    service_communication_1.decorators.action(A.HARD_DELETE),
    __param(0, controller_util_1.trustPayload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.DeleteUserRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "hardDelete", null);
UserController = __decorate([
    service_communication_1.decorators.mediateController(MODULE_NAME),
    service_communication_1.decorators.directController(MODULE_NAME),
    __param(0, inject(Types_1.Types.USER_SVC)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map