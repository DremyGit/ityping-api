const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ExerciseWordSchema = new Schema({
  _id: { type: ObjectId, select: false },
  l: Number,
  w: String,
  __v: { type: Number, select: false },
});


ExerciseWordSchema.statics = {

  updateWordsByLang(lang, words) {
    return ExerciseWord.remove({ l: lang }).exec().then(() => {
      const uniquedWords = words
        .filter((value, index, array) =>
          array.indexOf(value) === index)
        .map(word => ({ l: lang, w: word }));
      return ExerciseWord.insertMany(uniquedWords);
    });
  },

  getWordsByQuery(query) {
    return ExerciseWord.find(query).exec();
  },

  getWordsRandom(lang, size) {
    return ExerciseWord.aggregate([
      { $match: { l: lang } },
      { $sample: { size } },
      { $group: { _id: '$l', words: { $push: '$w' } } },
      { $project: { _id: 0, lang: '$_id', words: '$words' } },
    ]).exec();
  },
};

const ExerciseWord = mongoose.model('ExerciseWord', ExerciseWordSchema);

module.exports = ExerciseWord;
