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
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("@hapi/joi");
const common_1 = require("@micro-fleet/common");
const dto_base_1 = require("./dto-base");
const constants_shared_1 = require("../constants-shared");
//#region RPC Constants
exports.MODULE_NAME = 'mcftUserManagement';
var Action;
(function (Action) {
    Action["CREATE"] = "create";
    Action["EDIT"] = "edit";
    Action["HARD_DELETE"] = "hardDelete";
    Action["GET_BY_ID"] = "getById";
    Action["GET_LIST"] = "getList";
    Action["GET_ACTIVE_LIST"] = "getActiveList";
})(Action = exports.Action || (exports.Action = {}));
//#endregion RPC Constants
const USER_FIELDS = ['id', 'name', 'status'];
const FIELDS_RULE = { items: joi.string().only(USER_FIELDS) };
//#region Create
class CreateUserRequest extends common_1.Translatable {
    constructor() {
        super(...arguments);
        this.name = undefined; // Must be initialized, otherwise TypeScript compiler will remove it
        this.status = undefined;
    }
}
__decorate([
    common_1.decorators.required(),
    common_1.decorators.string({ minLength: 3, maxLength: 100 }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "name", void 0);
__decorate([
    common_1.decorators.required(),
    common_1.decorators.only(constants_shared_1.UserStatus.ACTIVE, constants_shared_1.UserStatus.LOCKED, constants_shared_1.UserStatus.DELETED),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "status", void 0);
exports.CreateUserRequest = CreateUserRequest;
class CreateUserResponse extends dto_base_1.ResultResponse {
    constructor() {
        super(...arguments);
        this.id = undefined;
        this.createdAt = undefined;
    }
}
exports.CreateUserResponse = CreateUserResponse;
//#endregion Create
//#region Delete
class DeleteUserRequest extends common_1.Translatable {
    constructor() {
        super(...arguments);
        this.ids = undefined;
        /**
         * If `true`, when failed to delete one ID, the whole operation is
         * considered failure, all changes are rolled back.
         *
         * Default is `true`
         */
        this.isAtomic = undefined;
    }
}
__decorate([
    common_1.decorators.required(),
    common_1.decorators.array({
        items: joi.string().regex(/\d+/).required(),
        allowSingle: true,
        maxLength: 10,
    }),
    __metadata("design:type", Array)
], DeleteUserRequest.prototype, "ids", void 0);
__decorate([
    common_1.decorators.boolean(),
    __metadata("design:type", Boolean)
], DeleteUserRequest.prototype, "isAtomic", void 0);
exports.DeleteUserRequest = DeleteUserRequest;
class DeleteUserResponse extends dto_base_1.ResultResponse {
    constructor() {
        super(...arguments);
        this.deletedAt = undefined;
    }
}
exports.DeleteUserResponse = DeleteUserResponse;
//#endregion Delete
//#region Edit
class EditUserRequest extends common_1.Translatable {
    constructor() {
        super(...arguments);
        this.id = undefined; // Must be initialized, otherwise TypeScript compiler will remove it
        this.name = undefined;
    }
}
__decorate([
    common_1.decorators.required(),
    common_1.decorators.bigInt(),
    __metadata("design:type", String)
], EditUserRequest.prototype, "id", void 0);
__decorate([
    common_1.decorators.string({ minLength: 3, maxLength: 100 }),
    __metadata("design:type", String)
], EditUserRequest.prototype, "name", void 0);
exports.EditUserRequest = EditUserRequest;
class EditUserResponse extends dto_base_1.ResultResponse {
    constructor() {
        super(...arguments);
        this.updatedAt = undefined;
    }
}
exports.EditUserResponse = EditUserResponse;
//#endregion Edit
//#region Get by ID
class GetUserByIdRequest extends common_1.Translatable {
    constructor() {
        super(...arguments);
        this.id = undefined;
        this.fields = undefined;
    }
}
__decorate([
    common_1.decorators.required(),
    common_1.decorators.bigInt(),
    __metadata("design:type", String)
], GetUserByIdRequest.prototype, "id", void 0);
__decorate([
    common_1.decorators.array(FIELDS_RULE),
    __metadata("design:type", Array)
], GetUserByIdRequest.prototype, "fields", void 0);
exports.GetUserByIdRequest = GetUserByIdRequest;
class GetSingleUserResponse extends dto_base_1.MaybeResponse {
    constructor() {
        super(...arguments);
        this.id = undefined;
        this.name = undefined;
        this.status = undefined;
    }
}
exports.GetSingleUserResponse = GetSingleUserResponse;
//#endregion Get by ID
//#region Get List
class GetUserListRequest extends dto_base_1.GetListRequestBase {
    constructor() {
        super(...arguments);
        this.fields = undefined;
    }
}
__decorate([
    common_1.decorators.array(FIELDS_RULE),
    __metadata("design:type", Array)
], GetUserListRequest.prototype, "fields", void 0);
exports.GetUserListRequest = GetUserListRequest;
class UserListItem extends common_1.Translatable {
    constructor() {
        super(...arguments);
        this.id = undefined;
        this.name = undefined;
        this.status = undefined;
    }
}
exports.UserListItem = UserListItem;
class GetUserListResponse extends dto_base_1.DTOListBase {
    constructor(users = [], total = 0) {
        super(UserListItem, users, total);
    }
}
exports.GetUserListResponse = GetUserListResponse;
//#endregion Get List
//# sourceMappingURL=user.js.map