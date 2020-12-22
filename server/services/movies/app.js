const express = require('express')
const { urlencoded } = require('express')
const port = 3001
const route = require('./routes')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))

app.use(route)

// The `listen` method launches a web app.


app.listen(port, () => {
    console.log('app is listening to: ',port)
})
