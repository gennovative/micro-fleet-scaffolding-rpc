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
const debug = require('debug')('scaffold:repo:user');
const common_1 = require("@micro-fleet/common");
const p = require("@micro-fleet/persistence");
const constants_shared_1 = require("../contracts/constants-shared");
const User_1 = require("../models/domain/User");
const UserORM_1 = require("../models/orm/UserORM");
let UserRepository = class UserRepository extends p.PgCrudRepositoryBase {
    constructor(connector) {
        super(UserORM_1.UserORM, User_1.User, connector);
        debug('UserRepository instantiated');
    }
    /**
     * @see IRepository.pageActive
     */
    async pageActive(opts) {
        const foundList = await this.executeQuery(query => {
            const q = this._buildPageActiveQuery(query, opts);
            debug('PAGE ACTIVE: %s', q.toSql());
            return q;
        }, opts.atomicSession);
        if (!foundList) {
            return new common_1.PagedData();
        }
        const dtoList = this.toDomainModelMany(foundList.results, false);
        return new common_1.PagedData(dtoList, foundList.total);
    }
    /**
     * @override
     */
    _buildPageActiveQuery(query, opts) {
        const q = super.$buildPageQuery(query, opts);
        q.where('status', constants_shared_1.UserStatus.ACTIVE);
        return q;
    }
};
UserRepository = __decorate([
    __param(0, common_1.decorators.inject(p.Types.DB_CONNECTOR)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map