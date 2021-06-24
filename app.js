const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config')
const { Router } = require('express');
const cors = require('cors')

const app = express()
const routes = require('./routes.js')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

const firebase = require('firebase')
firebase.initializeApp(config.firebaseConfig)

app.use('/', routes)

server = app.listen(config.local.port, function () {
    console.log("App Running")
    var host = server.address().address
    var port = server.address().port
    console.log(`Host ${host}`)
    console.log(`Port ${port}`)
})