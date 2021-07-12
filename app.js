const path = require('path')
const createError = require('http-errors')
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const routes = require('./routes/routes.js')
const { Console } = require('console')
require('dotenv').config();

const database = require('./connections.js')

var app = express();

database.mongo.connect()
.then((success) => console.log(success))
.catch((error) => console.log(error))

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: ['https://eaventure.live', 'http://localhost:2700']
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app
