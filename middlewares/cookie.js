const jwt = require('../common/jwt');
const User = require('../models').User;

async function createUser() {
  const user = await new User({
    nick_name: '用户 ' + Math.floor(Math.random() * 100000),
  }).create().then(u => u.toObject());
  user.token = jwt.create({ id: user._id, type: 0 });
  return user;
}

const cookieOptions = {
  expires: new Date(2018, 0, 1),
  httpOnly: false,
};

function verify(token) {
  try {
    return jwt.verify(token);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

module.exports = async (ctx, next) => {
  ctx.cookie = ctx.cookie || {};
  if (ctx.cookies.get('token')) {
    const object = verify(ctx.cookies.get('token'));
    ctx.cookie.userId = object && object.id;
  }
  if (!ctx.cookie.userId) {
    const user = await createUser();
    console.log('create user');
    ctx.cookies.set('token', user.token, cookieOptions);
    ctx.cookies.set('nick', encodeURIComponent(user.nick_name), cookieOptions);
    ctx.cookie.userId = user._id;
  }
  await next();
};
