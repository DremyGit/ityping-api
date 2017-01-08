const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = new Koa();

app.use(middlewares.errorHandling);
app.use(middlewares.cookie);
app.use(bodyparser());
app.use(controllers);

app.listen(3000);
