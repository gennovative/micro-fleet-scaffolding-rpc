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
const common_1 = require("@micro-fleet/common");
const constants_shared_1 = require("../constants-shared");
class GetListRequestBase extends common_1.Translatable {
    constructor() {
        super(...arguments);
        this.pageIndex = undefined;
        this.pageSize = undefined;
        this.sortBy = undefined;
        this.sortType = undefined;
        // Do not use "SortType" in @micro-fleet/persistence because
        // this file is copy to REST service which doesn't depends on @micro-fleet/persistence.
    }
}
__decorate([
    common_1.decorators.number({ min: 1, max: 100 }),
    common_1.decorators.defaultAs(1),
    __metadata("design:type", Number)
], GetListRequestBase.prototype, "pageIndex", void 0);
__decorate([
    common_1.decorators.number({ min: 3, max: 100 }),
    common_1.decorators.defaultAs(10),
    __metadata("design:type", Number)
], GetListRequestBase.prototype, "pageSize", void 0);
__decorate([
    common_1.decorators.string({ maxLength: 50 }),
    __metadata("design:type", String)
], GetListRequestBase.prototype, "sortBy", void 0);
__decorate([
    common_1.decorators.string(),
    common_1.decorators.only(constants_shared_1.SortType.ASC, constants_shared_1.SortType.DESC),
    __metadata("design:type", String)
], GetListRequestBase.prototype, "sortType", void 0);
exports.GetListRequestBase = GetListRequestBase;
class DTOListBase {
    constructor(ItemClass, items = [], total) {
        this.items = undefined;
        this.total = undefined;
        this.items = ItemClass.fromMany(items);
        this.total = (total != null) ? total : this.items.length;
    }
    static from(source) {
        // In this case, "this" refers to the derived class, whose constructor should only accept 2 parameters.
        return new this(source['items'], source['total']);
    }
    toPagedData() {
        return new common_1.PagedData(this.items, this.total);
    }
}
exports.DTOListBase = DTOListBase;
class MaybeResponse extends common_1.Translatable {
    constructor(hasData = true) {
        super();
        /**
         * If `false`, other properties are unusable.
         */
        this.hasData = undefined;
        this.hasData = hasData;
    }
    toMaybe() {
        return this.hasData
            ? common_1.Maybe.Just(this)
            : common_1.Maybe.Nothing();
    }
}
exports.MaybeResponse = MaybeResponse;
class ResultResponse extends common_1.Translatable {
    constructor(isOk = true, error) {
        super();
        /**
         * If `false`, other properties, except `error`, are unusable.
         */
        this.hasData = undefined;
        /**
         * Error object or message. Only usable when `hasData` is `false.
         */
        this.error = undefined;
        this.hasData = isOk;
        this.error = error;
    }
    toResult() {
        if (this.hasData) {
            const { hasData, error, ...props } = this;
            return common_1.Result.Ok(props);
        }
        return common_1.Result.Failure(this.error);
    }
}
exports.ResultResponse = ResultResponse;
//# sourceMappingURL=dto-base.js.map