const controller = require('../controllers/stops')
const express = require('express')

var router = express.Router()

router.get('/stops', function (req, res, next) {
    console.log("Getting data")
     controller.getRoutesEAV("225")
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

module.exports = router