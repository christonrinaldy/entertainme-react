const route = require('express').Router()
const MovieController = require('../controllers/movieController')

route.delete('/:id',MovieController.deleteOne)
route.put('/:id',MovieController.updateOne)
route.get('/:id',MovieController.findOne)
route.get('/',MovieController.findAll)
route.post('/',MovieController.addMovie)

module.exports = route