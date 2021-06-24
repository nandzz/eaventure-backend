const express = require('express')
const router = express.Router()

const { getRoutesEAV } = require('./controllers/stops.js')

router.get('/stops', async function (req, res) {
     await getRoutesEAV("ETR001")
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