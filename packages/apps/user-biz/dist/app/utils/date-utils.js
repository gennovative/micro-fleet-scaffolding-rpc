"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
/**
 * Converts a UTC time string to W3C Date and Time Formats.
 * If the input is not parseable by "moment",
 * the function returns the original string.
 */
function toUtcTimeString(source) {
    if (!source) {
        return source;
    }
    const wrapped = moment.utc(source);
    return (wrapped.isValid() ? wrapped.format() : source);
}
exports.toUtcTimeString = toUtcTimeString;
/**
 * Wraps `source` in a Moment instance in UTC.
 * If `source` is not given, returns Moment instance of current time in UTC.
 */
function momentify(source) {
    return moment.utc(source);
}
exports.momentify = momentify;
//# sourceMappingURL=date-utils.js.map