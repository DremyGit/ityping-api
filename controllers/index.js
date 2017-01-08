const Router = require('koa-router');
const userController = require('./user');
const exerciseWordController = require('./exercise-word');
const exerciseRecordController = require('./exercise-record');

const router = new Router();
const users = new Router();
const exerciseWords = new Router();
const exerciseRecords = new Router();

users
  .get('/', userController.getAllUser)
  .param('user_id', userController.assert)
  .get('/:user_id', userController.getUser)
  .put('/:user_id', userController.updateUser)
  .delete('/:user_id', userController.removeUser);
router.use('/users', users.routes());

exerciseWords
  .get('/', exerciseWordController.getWords)
  .get('/random', exerciseWordController.getWordsRandom)
  .post('/', exerciseWordController.updateWordsByLang);
router.use('/exercise/words', exerciseWords.routes());

exerciseRecords
  .get('/', exerciseRecordController.getRecords)
  .post('/', exerciseRecordController.createRecord);
router.use('/exercise/records', exerciseRecords.routes());

module.exports = router.routes();
