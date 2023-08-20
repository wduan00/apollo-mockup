const express = require('express')
const app = express()
const port = 3000

// routes
app.get('/', (req, res) => {
    res.send('Hello Apollo')
})

app.listen(port, ()=> {
    console.log('Apollo app is running on port 3000')
})