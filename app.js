
const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config')
const debug = require('debug')('app4')

const { Router } = require('express');
const cors = require('cors')


var   app = express()
      env = app.settings.env

const routes = require('./routes.js')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/', routes)

http.createServer(app).listen(3000, function(){
    console.log("Listening")
});

