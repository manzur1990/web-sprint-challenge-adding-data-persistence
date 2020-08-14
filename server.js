const express = require('express')


const server = express()


server.get('/', (req, res) =>{
    res.send({message: 'Api is live'})
})


server.use((error, req, res, next) =>{
    console.log(error)
    res.status(500).json({
        message: "Internal Error"
    })
})


module.exports = server