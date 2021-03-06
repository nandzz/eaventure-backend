const controller = require('../controllers/stops')
const media = require('../controllers/media')

const express = require('express')
var router = express.Router()

router.get('/stops/:id', function (req, res, next) {
     const id = req.params.id
     console.log(id)
     controller.getRoutesEAV(id)
     .then((data) => {
         if (data  == null) {
            res.statusCode = 503
            res.send({ "msg": "Sorry, the system isn't avaliable"})
            return
         }
         console.log(data)
         res.send(data)
     })
     .catch( (error) => {
         console.log(error)
     })
})

router.get('/media', function (req, res, next) {
    console.log("Getting Media")
    media.getMedia("sas")
    .then((data) => {
        if(data == null) {
            res.statusCode = 503
            res.send({"msg": "Sorry, the system isn't avaliable"})
            return
        } 
        console.log(data)
        res.send(data)
    })
    .catch((error) => {
        console.log(error)
    })
})


module.exports = router
