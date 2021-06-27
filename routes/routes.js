import controller from '../controllers/stops.js'


import express from 'express'
var router = express.Router()


router.get('/stops', function (req, res, next) {
     controller.getRoutesEAV("ETR001")
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

export default router