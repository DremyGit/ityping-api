const easycopy = require('easy-copy');
const HttpError = require('some-http-error');
const mongoose = require('mongoose');
const jwt = require('../common/jwt');
const User = require('../models').User;

exports.assert = async (id, ctx, next) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    ctx.user = await User.getById(id);
  }
  if (!ctx.user) {
    throw new HttpError.NotFoundError('用户不存在');
  }
  await next();
};

// exports.createUser = async ctx => {
//   const user = await new User({
//     nick_name: '用户 ' + Math.floor(Math.random() * 100000),
//   }).create().then(u => u.toObject());

//   user.token = jwt.create({ id: user._id, type: 0 });

//   ctx.body = user;
//   ctx.status = 201;
// };

exports.getUser = async ctx => {
  ctx.body = ctx.user;
};

exports.getUserFromCookie = async ctx => {
  ctx.body = await User.getById(ctx.cookie.userId);
};

exports.getAllUser = async ctx => {
  ctx.body = await User.getAll();
};


exports.updateUser = async ctx => {
  const body = easycopy(ctx.request.body, ['nick_name'], { undefined: false });
  ctx.body = await ctx.user.update(body);
  ctx.status = 201;
};

exports.removeUser = async ctx => {
  await ctx.user.delete();
  ctx.status = 204;
  ctx.body = null;
};

