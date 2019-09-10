"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@micro-fleet/common");
const date_utils_1 = require("../../utils/date-utils");
class User extends common_1.Translatable {
    constructor() {
        super(...arguments);
        this.id = undefined; // Must be initialized, otherwise TypeScript compiler will remove it
        this.name = undefined;
        this.status = undefined;
        this.createdAt = undefined;
        this.updatedAt = undefined;
    }
    get createdMoment() {
        return date_utils_1.momentify(this.createdAt);
    }
    get updatedMoment() {
        return date_utils_1.momentify(this.updatedAt);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map