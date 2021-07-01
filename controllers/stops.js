const { response } = require('express')
const fetch = require('node-fetch') 
const external = require('../connections.js')

// This function is responsible to communicate with EAV API and fetch the route 

async function getData(id) {
        let dateNow = new Date()
        let key = Math.round((dateNow.getFullYear() + dateNow.getMonth() + dateNow.getDate()) / 2)
        const response = await fetch(`https://statocorsa.eavsrl.it/Etr/${id}/${key}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response
}

async function build(data) {    

    // This functions expest a json data of model
    /*
    {
        "Orario_Arrivo":"15:41:00",
        "Orario_Partenza":"15:41:30",
        "Sequenza":3,
        "Stazione":828
    },

    * Once we get the date from EAV API 'https://statocorsa.eavsrl.it' we communicate with our backend 
    to get the list of stations
    
    // - TODO: Maybe we can cache this list in the code to avoid always communication with database
       - Undestand if the list of stations has a specific identifications for a route
    */


    let _json = data
    let json_response = { stops: [] }
    let now_date = new Date()


    // Fetch the list of Stations from our database
    const prepare = await external.mongo.with.db('eaventure').collection('stations').findOne()
    const stations = prepare.stations

    /*
      Find the next stations by time 
      TODO: - Find the next stations by locations ( long , lat )
    */
    
    let next = function calculateNext() {

        // Take the data now ( we expect the server has the same time location of italy)
        let now_date = new Date()

        // Find the next stop based on the time now
        let index_of_next_station = _json.Righe.find((station) => {  
            let time = station.Orario_Arrivo.split(':')
            let train_date = new Date()
            if (time.lenght < 3) { return }
            train_date.setHours(time[0], time[1], time[2])
            return train_date > now_date
        })

        if (index_of_next_station != undefined) {
            return index_of_next_station.Sequenza
        }

        if (_json.Righe[0]) {
          return _json.Righe[0].Sequenza
        }

        return null
    }()

    /*
    Format the model of data which the app expects

    { isNext: false, 
      time: '15:41:00', 
      stop: 'Quarto Officina' 
    },
    */ 

    let new_json = async function formatNewJson() {
        if (next == null) {
            return null
        }
        let buffer = { stops: [] }
        _json.Righe.forEach((data, index) => {
            let objc = {}
            objc.isNext = data.Sequenza == next
            objc.time = index == 0 ? data.Orario_Partenza : data.Orario_Arrivo
            objc.stop = stations.find((element) => element["Codice Unificato"] == data.Stazione).Descrizione
            buffer.stops.push(objc)
            return objc
        })
        return buffer
    } () 
    return new_json
}

 controller = {
    getRoutesEAV: async (id) => {
            let EAV_response = await getData()
            let json = await EAV_response.json()
            let response = await build(json)
            return response
    },
}

module.exports = controller