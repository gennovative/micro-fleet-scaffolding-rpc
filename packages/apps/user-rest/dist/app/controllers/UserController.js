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
const common_1 = require("@micro-fleet/common");
const web_1 = require("@micro-fleet/web");
const Types_1 = require("../constants/Types");
const dto = require("../contracts/dto/user");
let UserController = class UserController extends web_1.RestControllerBase {
    constructor(_userSvc) {
        super();
        this._userSvc = _userSvc;
        debug('UserController instantiated');
    }
    /**
     * GET {prefix}/users/:id?fields=prop
     * @example /api/v1/users/123654?fields=id&fields=name
     */
    getOne(params) {
        return this._userSvc.getById(params);
    }
    /**
     * GET {prefix}/users/
     * @example /api/v1/users?pageIndex=2&pageSize=10&sortBy=name&sortType=desc
     */
    getList(params) {
        return this._userSvc.getList(params);
    }
    /**
     * GET {prefix}/users/active
     * @example /api/v1/users/active?pageIndex=2&pageSize=10&sortBy=name&sortType=desc
     */
    getActiveList(params) {
        return this._userSvc.getActiveList(params);
    }
    /**
     * POST {prefix}/users
     * @example /api/v1/users
     *
     * Request body for creating a single user:
     * {
     *	name: 'John Nemo',
     * }
     *
     * or
     *
     * {
     *	name: 'John Nemo',
     *	status: 'active',
     * }
     */
    async create(params) {
        return this._userSvc.create(params);
    }
    /**
     * PATCH {prefix}/users
     * @example /api/v1/users
     *
     * {
     *	id: '123498765',
     *	name: 'Nemo Doe',
     * }
     */
    edit(params) {
        return this._userSvc.edit(params);
    }
    /**
     * DELETE {prefix}/users/:ids
     * @example /api/v1/users/123654
     */
    deleteSingle(params) {
        return this._userSvc.hardDeleteSingle(params);
    }
    /**
     * DELETE {prefix}/users
     * @example /api/v1/users?ids=123&ids=456&ids=789
     */
    deleteMany(params) {
        return this._userSvc.hardDeleteMany(params);
    }
};
__decorate([
    web_1.decorators.GET(':id'),
    __param(0, web_1.decorators.model({
        extractFn: (r) => ({
            id: r.params.id,
            fields: r.query.fields,
        }),
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.GetUserByIdRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOne", null);
__decorate([
    web_1.decorators.GET('/'),
    __param(0, web_1.decorators.model({
        extractFn: (r) => r.query,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.GetUserListRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getList", null);
__decorate([
    web_1.decorators.GET('/active'),
    __param(0, web_1.decorators.model({
        extractFn: (r) => r.query,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.GetUserListRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getActiveList", null);
__decorate([
    web_1.decorators.POST('/'),
    __param(0, web_1.decorators.model()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.CreateUserRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    web_1.decorators.PATCH('/'),
    __param(0, web_1.decorators.model({ isPartial: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.EditUserRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "edit", null);
__decorate([
    web_1.decorators.DELETE(':ids'),
    __param(0, web_1.decorators.model({
        extractFn: (r) => r.params,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.DeleteUserRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteSingle", null);
__decorate([
    web_1.decorators.DELETE('/'),
    __param(0, web_1.decorators.model({
        extractFn: (r) => r.query,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.DeleteUserRequest]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteMany", null);
UserController = __decorate([
    web_1.decorators.controller('users'),
    __param(0, common_1.decorators.inject(Types_1.Types.USER_SVC)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map