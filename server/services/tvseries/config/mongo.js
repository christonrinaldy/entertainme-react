const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

const dbName = 'entertainMe'
const client = new MongoClient(uri,{useUnifiedTopology:true});

client.connect()
const db = client.db(dbName)

module.exports = db
