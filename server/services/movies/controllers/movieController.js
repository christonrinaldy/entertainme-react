const MovieModel = require('../models/movie')
const Redis = require('ioredis')
const redis = new Redis
class MovieController {
    static async findAll(req,res) {
        try{
            const movies = await MovieModel.findAll()
            res.status(200).json(movies)            
        } catch(err) {
            res.status(400).json({message: err})
        }
    }
    static async addMovie(req,res) {
        
        try {
            const newMovie = req.body
            const movie = await MovieModel.insertOne(newMovie)
            res.status(200).json(movie.ops[0])
        } catch (err) {
            res.status(400).json({message: err})

        }
    }
    static async findOne(req,res) {
        try {
            const {id} = req.params
            const movie = await MovieModel.findById(id)
            res.status(200).json(movie)
        } catch (err) {
            res.status(400).json({message: err})
        }
    }
    static async updateOne(req,res) {
        try {
            const {id} = req.params
            const newMovie = req.body
            const movie = await MovieModel.updateOne(id,newMovie)
            res.status(200).json(movie.value)
        } catch(err) {
            res.status(400).json({message: err})
        }
    }
    static async deleteOne(req,res) {
        try{
            const {id} = req.params
            const movie = await MovieModel.deleteOne(id)
            res.status(200).json(movie.value)
        } catch(err) {

        }
    }
}
module.exports = MovieController