const error3 = require('error3');

class AccessError extends error3 {};
class ConflictError extends error3 {};
class BadParamsError extends error3 {};
class AppError extends error3 {};

exports.Access = AccessError;
exports.Conflict = ConflictError;
exports.BadParams = BadParamsError;
exports.App = AppError;

AccessError.CONFIRM_TOKEN_REQUIRED = () => 'Confirmation token required';
AccessError.TWO_FACTOR_CONFIRM_TOKEN = () => 'Invalid two factor confirmation token';
AccessError.NOT_PERMITTED = () => 'Action not permitted';
