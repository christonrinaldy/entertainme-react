const { ObjectId } = require('mongodb')
const db = require('../config/mongo')
const Movie = db.collection('movies') 
class MovieModel {
    static findAll() {
        return Movie.find().toArray()
    }
    static findById(id) {
        return Movie.findOne({_id: ObjectId(id)})
    }
    static insertOne(movie) {
        return Movie.insertOne(movie)
    }
    static deleteOne(id) {
        return Movie.findOneAndDelete({_id: ObjectId(id)})
    }
    static updateOne(id,movie) {
        return Movie.findOneAndUpdate({_id: ObjectId(id)},{ $set: movie}, {returnOriginal: false})
    }
}
module.exports = MovieModel