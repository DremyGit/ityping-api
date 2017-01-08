const easycopy = require('easy-copy');
const HttpError = require('some-http-error');
const ObjectId = require('mongoose').Types.ObjectId;
const Record = require('../models').ExerciseRecord;

exports.createRecord = async ctx => {
  const body = easycopy(ctx.request.body,
    ['lang', 'average_speed', 'instant_speeds', 'accuracy',
      'correct_count', 'error_count'],
    { undefined: false },
  );
  Object.getOwnPropertyNames(body).forEach(key => {
    if (typeof body[key] === 'undefined') {
      throw new HttpError.BadRequestError(`${key} is not defined`);
    }
  });
  body.user = ctx.cookie.userId;
  ctx.body = await new Record(body).create();
  ctx.status = 201;
};

exports.getRecords = async ctx => {
  const user = ctx.query.user;
  const lang = +ctx.query.lang;
  const query = {};
  if (ObjectId.isValid(user)) {
    query.user = user;
  }
  if (!Number.isNaN(lang)) {
    query.lang = lang;
  }
  ctx.body = await Record.getByQuery(query);
};
