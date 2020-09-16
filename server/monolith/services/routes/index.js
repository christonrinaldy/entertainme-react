const route = require('express').Router()
const movieRoute = require('./moviesroute')
const tvSeriesRoute = require('./tvSeriesroute')

route.use('/movies',movieRoute)
route.use('/tvSeries',tvSeriesRoute)

module.exports = route