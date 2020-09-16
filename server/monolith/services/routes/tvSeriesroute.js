const route = require('express').Router()
const { ObjectId } = require('mongodb')
const tvSeriesDb = require('../tvseries/index')

route.delete('/:id', (req,res) => {
    const movieId = req.params.id
    tvSeriesDb()
    .then(data => {
        data.findOneAndDelete({_id: ObjectId(movieId)})
    })
    .then((resp) => {
        console.log(resp,'<<<<<<<<')
        res.status(200).json('success to delete')
    })
    .catch(err => {
        res.status(400).json({message: err})
    })
})
route.put('/:id', (req,res) => {
    const {title, overview, tags, poster_path, popularity} = req.body
    let movie = {
        title,
        overview,
        tags: tags.split(','),
        poster_path,
        popularity
    }
    const movieId = req.params.id
    tvSeriesDb()
    .then(data => {
        data.findOneAndUpdate({_id: ObjectId(movieId)},{$set: movie})
    })
    .then((resp) => {
        res.status(200).json('success to update')
    })
    .catch(err => {
        res.status(400).json({message: err})
    })
})

route.get('/',(req,res) => {
    tvSeriesDb()
    .then(resp => {
        resp.find().toArray()
        .then(data => {
            res.send(data)
        })
    })
    .catch(err => {
        res.send(err)
    })
})
route.post('/',(req,res) => {
    const {title, overview, tags, poster_path, popularity} = req.body
    let movie = {
        title,
        overview,
        tags: tags.split(','),
        poster_path,
        popularity
    }
    tvSeriesDb()
    .then(data => {
        data.insertOne(movie)
    })
    .then(data=> {
        console.log('ini data>>>',data)
        res.status(200).json('success')
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = route