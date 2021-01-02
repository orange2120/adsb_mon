const express = require('express')
const app = express()

app.use('/data', express.static('./data'))

const port = 4000

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})