const { ObjectId } = require('mongodb')
const db = require('../config/mongo')
const TvSeries = db.collection('tvSeries')
class TvSeriesModel {
    static findAll() {
        return TvSeries.find().toArray()
    }
    static findById(id) {
        return TvSeries.findOne({_id: ObjectId(id)})
    }
    static insertOne(tvseries) {
        return TvSeries.insertOne(tvseries)
    }
    static deleteOne(id) {
        return TvSeries.findOneAndDelete({_id: ObjectId(id)})
    }
    static updateOne(id,tvseries) {
        return TvSeries.findOneAndUpdate({_id: ObjectId(id)},{ $set: tvseries}, {returnOriginal: false})
    }
}
module.exports = TvSeriesModel