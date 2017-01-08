const HttpError = require('some-http-error');
const Word = require('../models').ExerciseWord;

exports.updateWordsByLang = async ctx => {
  const body = ctx.request.body;
  if (typeof body.lang === 'undefined') {
    throw new HttpError.BadRequestError('`lang` is undefined');
  }
  if (!body.words || !Array.isArray(body.words)) {
    throw new HttpError.BadRequestError('words is not an array');
  }
  const words = await Word.updateWordsByLang(body.lang, body.words);
  ctx.body = words;
  ctx.status = 201;
};

exports.getWords = async ctx => {
  const query = {};
  const resBody = {};
  const lang = +ctx.query.lang;
  if (!(Number.isNaN(lang))) {
    query.l = lang;
    resBody.lang = lang;
  }
  const words = await Word.getWordsByQuery(query);
  resBody.words = words.map(word => word.w);
  ctx.body = resBody;
};

exports.getWordsRandom = async ctx => {
  const lang = +ctx.query.lang;
  if (Number.isNaN(lang)) {
    throw new HttpError.BadRequestError('lang is not defined');
  }
  const words = await Word.getWordsRandom(lang, 150);
  ctx.body = words[0];
};
