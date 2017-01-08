const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ExerciseRecordSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  lang: Number,
  average_speed: Number,
  instant_speeds: [{
    t: Number,
    s: Number,
    _id: false,
  }],
  accuracy: Number,
  correct_count: Number,
  error_count: Number,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  __v: { type: Number, select: false },
});

ExerciseRecordSchema.methods = {
  create() {
    return this.save();
  },
};

ExerciseRecordSchema.statics = {
  getByQuery(query) {
    return ExerciseRecord.find(query, {}, { sort: { _id: -1 } }).exec();
  },
};

const ExerciseRecord = mongoose.model('ExerciseRecord', ExerciseRecordSchema);

module.exports = ExerciseRecord;
