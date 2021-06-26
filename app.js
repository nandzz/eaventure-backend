
const express = require('express')
const http = require('http')
const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config')

const { Router } = require('express');
const cors = require('cors')

console.log(process.getuid())

const app = express()
const routes = require('./routes.js')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/', routes)

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log("App Running")
})


