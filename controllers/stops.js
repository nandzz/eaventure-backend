import fetch from 'node-fetch'

const stations = [
    "NAPOLI PORTA NOLANA",
    "NAPOLI P. GARIBALDI",
    "Via Gianturco",
    "S. GIOVANNI A TEDUCCIO",
    "BARRA",
    "S. Maria  del Pozz",
    "S. GIORGIO A CREMANO",
    "S. Giorgio Cavalli di Bronzo",
    "Portici Bellavista",
    "Portici Via Libert",
    "ERCOLANO SCAVI",
    "Ercolano Miglio d'Oro",
    "TORRE DEL GRECO",
    "Via S. Antonio",
    "Via del Monte",
    "Via dei Monaci",
    "Villa delle Ginestre",
    "LEOPARDI",
    "Via Viuli",
    "Trecase",
    "TORRE A.TA - OPLONTI",
    "Villa Regina",
    "POMPEI SCAVI VILLA DEI MISTER",
    "Moregine",
    "PIOPPAINO",
    "Via Nocera",
    "CASTELLAMMARE DI STABIA",
    "Castellammare Terme",
    "POZZANO",
    "Scrajo",
    "VICO EQUENSE",
    "Seiano",
    "META",
    "PIANO",
    "S. Agnello",
    "SORRENTO",
]

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

function build(data) {  
    let _json = data
    let json_response = { stops: [] }
    let now_date = new Date()

    let next = function calculateNext() {
        let now_date = new Date()
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

    let new_json = function formatNewJson() {
        if (next == null) {
            return null
        }

        let buffer = { stops: [] }

        _json.Righe.forEach((data, index) => {
            let objc = {}
            objc.isNext = data.Sequenza == next
            objc.time = index == 0 ? data.Orario_Partenza : data.Orario_Arrivo

            if (stations[data.Sequenza]) {
                objc.stop = stations[data.Sequenza]
            } else {
                objc.stop = "---"
            }
            buffer.stops.push(objc)
            return objc
        })
        return buffer
    }()

    return new_json
}

const controller = {
    getRoutesEAV: async (id) => {
            let EAV_response = await getData()
            let json = await EAV_response.json()
            let response = await build(json)
            return response
    },
}

export default controller