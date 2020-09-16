const route = require('express').Router()
const tvSeriesRoute = require('./tvSeriesRoute')

route.use('/tvSeries',tvSeriesRoute)

module.exports = route