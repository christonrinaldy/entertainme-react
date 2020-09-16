const TvSeriesModel = require('../models/tvseries')
const Redis = require('ioredis')
const redis = new Redis
class TvSeriesController {
    static async findAll(req,res) {
        try{
            const tvSeriesCache = await redis.get('tvseries')
            if(tvSeriesCache) {
                res.status(200).json(JSON.parse(tvSeriesCache))
            } else {
                const TvSeries = await TvSeriesModel.findAll()
                await redis.set('tvseries',JSON.stringify(TvSeries))
                res.status(200).json(TvSeries)
            }
            
        } catch(err) {
            res.status(400).json({message: err})
        }
    }
    static async addTvSeries(req,res) {
        
        try {
            const newTvSeries = req.body
            const AddedTvSeries = await TvSeriesModel.insertOne(newTvSeries)
            const TvSeries = await TvSeriesModel.findAll()
            await redis.set('tvseries',JSON.stringify(TvSeries))
            res.status(200).json(AddedTvSeries.ops[0])
        } catch (err) {
            res.status(400).json({message: err})

        }
    }
    static async findOne(req,res) {
        try {
            const {id} = req.params
            const TvSeries = await TvSeriesModel.findById(id)
            res.status(200).json(TvSeries)
        } catch (err) {
            res.status(400).json({message: err})
        }
    }
    static async updateOne(req,res) {
        try {
            const {id} = req.params
            const newTvSeries = req.body
            const UpdTvSeries = await TvSeriesModel.updateOne(id,newTvSeries)
            const TvSeries = await TvSeriesModel.findAll()
            await redis.set('tvseries',JSON.stringify(TvSeries))
            res.status(200).json(UpdTvSeries.value)
        } catch(err) {
            res.status(400).json({message: err})
        }
    }
    static async deleteOne(req,res) {
        try{
            const {id} = req.params
            const DelTvSeries = await TvSeriesModel.deleteOne(id)
            const TvSeries = await TvSeriesModel.findAll()
            await redis.set('tvseries',JSON.stringify(TvSeries))
            res.status(200).json(DelTvSeries.value)
        } catch(err) {

        }
    }
}
module.exports = TvSeriesController