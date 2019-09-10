"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Do not use "SortType" in @micro-fleet/persistence because
// this file is copy to REST service which doesn't depends on @micro-fleet/persistence.
var SortType;
(function (SortType) {
    SortType["ASC"] = "asc";
    SortType["DESC"] = "desc";
})(SortType = exports.SortType || (exports.SortType = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["LOCKED"] = "locked";
    UserStatus["DELETED"] = "deleted";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
//# sourceMappingURL=constants-shared.js.map