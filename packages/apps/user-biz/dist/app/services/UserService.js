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
const id_generator_1 = require("@micro-fleet/id-generator");
const persistence_1 = require("@micro-fleet/persistence");
const Types_1 = require("../constants/Types");
const dto = require("../contracts/dto/user");
const User_1 = require("../models/domain/User");
const ManagementServiceBase_1 = require("./ManagementServiceBase");
let UserService = class UserService extends ManagementServiceBase_1.ManagementServiceBase {
    constructor(sessionFactory, repo, _idGen) {
        super(User_1.User, repo, sessionFactory);
        this._idGen = _idGen;
        debug('UserService instantiated');
    }
    get _userRepo() {
        return this.$repo;
    }
    //#region Create
    /**
     * @see IUserService.create
     */
    create(params) {
        return this.$create({
            ...params,
            id: this._idGen.nextBigInt(),
        }, dto.CreateUserResponse);
    }
    /**
     * @override
     */
    async $checkCreateViolation(params) {
        if (await this.$repo.exists({ name: params.name })) {
            return common_1.Maybe.Just('TENANT_NOT_EXISTING');
        }
        return common_1.Maybe.Nothing();
    }
    //#endregion Create
    //#region Edit
    /**
     * @see IUserService.edit
     */
    edit(params) {
        return this.$edit(params, dto.EditUserResponse);
    }
    /**
     * @override
     */
    $checkEditViolation(params) {
        return Promise.resolve(common_1.Maybe.Nothing());
    }
    //#endregion Edit
    //#region Delete
    /**
     * @see IUserService.hardDeleteSingle
     */
    hardDeleteSingle(params) {
        return this.$hardDeleteSingle(params, dto.DeleteUserResponse);
    }
    /**
     * @see IUserService.hardDeleteMany
     */
    hardDeleteMany(params) {
        return this.$hardDeleteMany(params, dto.DeleteUserResponse);
    }
    /**
     * @override
     */
    $checkDeleteManyViolation(params) {
        return Promise.resolve(common_1.Maybe.Nothing());
    }
    //#endregion Delete
    //#region Get
    /**
     * @see IUserService.getById
     */
    getById(params) {
        const repoParams = this._rebuildGetParams(params);
        return this.$getById(repoParams, dto.GetSingleUserResponse);
    }
    /**
     * @see IUserService.getActiveList
     */
    async getActiveList(params) {
        const fetchedDomainModels = await this._userRepo.pageActive(params);
        if (fetchedDomainModels.length) {
            const result = dto.GetUserListResponse.from(fetchedDomainModels);
            return result;
        }
        return new dto.GetUserListResponse();
    }
    /**
     * @see IUserService.getList
     */
    // @cacheable('userSvc:getList')
    getList(params) {
        debug('UserService.getList');
        return this.$getList(params, dto.GetUserListResponse);
    }
    _rebuildGetParams(params) {
        if (params.fields && params.fields.includes('tenantName')) {
            return {
                ...params,
                // Remove "tenantName" because it isn't a table column
                fields: params.fields.filter((f) => f !== 'tenantName'),
                // ObjectionJS relation object expression
                relations: {
                    tenant: ['name'],
                },
            };
        }
        return params;
    }
};
UserService = __decorate([
    __param(0, common_1.decorators.inject(persistence_1.Types.ATOMIC_SESSION_FACTORY)),
    __param(1, common_1.decorators.inject(Types_1.Types.USER_REPO)),
    __param(2, common_1.decorators.inject(id_generator_1.Types.ID_PROVIDER)),
    __metadata("design:paramtypes", [persistence_1.AtomicSessionFactory, Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map