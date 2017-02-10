import express from 'express'
import path from 'path'

const app = new express()
const port = process.env.PORT || 3002

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }

    console.log("app is now listen on port", port)
})