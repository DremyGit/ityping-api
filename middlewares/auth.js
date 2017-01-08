const HttpError = require('some-http-error');
const jwt = require('../common/jwt');

exports.verify = async (ctx, next) => {
  const authHeader = ctx.request.header.authorization;
  const auth = ctx.auth = { isAuth: false, isAdmin: false, message: 'Unauthorized' };
  if (!authHeader) {
    return await next();
  }

  const token = authHeader.split(' ')[1];
  if (authHeader.split(' ')[0] !== 'Bearer' || !token) {
    auth.message = 'Authorization type error';
    return await next();
  }

  let obj = {};
  try {
    obj = jwt.verify(token);
  } catch (err) {
    auth.message = err.message;
    return await next();
  }
  auth.isAuth = true;
  auth.isAdmin = obj.user_type === 'admin';
  delete auth.message;
  return await next();
};

exports.adminRequired = async (ctx, next) => {
  if (process.env.NODE_ENV === 'test') {
    return await next();
  }
  if (!ctx.auth.isAuth) {
    throw new HttpError.UnauthorizedError(ctx.auth.message);
  } else if (!ctx.auth.isAdmin) {
    throw new HttpError.ForbiddenError('Access Denied');
  } else {
    return await next();
  }
};
