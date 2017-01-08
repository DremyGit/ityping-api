const mongoose = require('mongoose');
const config = require('../configs');

mongoose.Promise = Promise;

mongoose.connect(config.mongoodb);

if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

exports.User = require('./user');
exports.ExerciseWord = require('./exercise-word');
exports.ExerciseRecord = require('./exercise-record');
