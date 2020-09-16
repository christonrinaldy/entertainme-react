const route = require('express').Router()
const TvSeriesController = require('../controllers/tvSeriesController')

route.delete('/:id',TvSeriesController.deleteOne)
route.put('/:id',TvSeriesController.updateOne)
route.get('/:id',TvSeriesController.findOne)
route.get('/',TvSeriesController.findAll)
route.post('/',TvSeriesController.addTvSeries)

module.exports = route