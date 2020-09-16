const express = require('express')
const { urlencoded } = require('express')
const port = 3001
const route = require('./routes')

const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use(route)

app.listen(port, () => {
    console.log('app is listening to: ',port)
})
