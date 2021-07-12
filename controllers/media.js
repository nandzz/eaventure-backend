const { response } = require('express')
const fetch = require('node-fetch') 
const external = require('../connections.js')

async function getMediaForRoute(id) {
    const data = await external.mongo.with.db('eaventure').collection('media').findOne()
    const media = data.medias
    return media
}

controller = {
    getMedia: async (id) => { 
        let response = await getMediaForRoute(id)
        return response
    },
}

module.exports = controller