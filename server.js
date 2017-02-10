import express from 'express'

const app = new express()
const port = process.env.PORT || 3002

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }

    console.log("app is now listen on port", port)
})