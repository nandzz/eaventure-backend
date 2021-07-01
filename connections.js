var mongo = require('mongodb').MongoClient;

const option = {
    useUnifiedTopology: true, 
    useNewUrlParser: true
}

class Database {

    get with () {
        if (this.database != null) {
            return this.database
        } else {
            console.log('db connection is off')
        }
    }

    connect () {
        return new Promise((resolve, reject) =>  {
             mongo.connect(process.env.MONGO_URL, option)
            .then( db => {
                this.database = db
                resolve("Successfully connected to database")
            }) 
            .catch( error => {
                reject('Error during call')
            })  
      })
    }
}

module.exports.mongo = new Database()