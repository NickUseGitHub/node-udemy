import express from 'express'
import path from 'path'
import Twig from 'twig'

const env = process.env.NODE_ENV || 'production'
const app = new express()
const port = process.env.PORT || 3002

app.set('views', path.resolve(__dirname, './app/views'))

app.get('/', (req, res) => {
    res.json({env, port})
    // res.render('index.twig', {
    //   name: 'nick naja eiei'
    // })
})

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }

    console.log("app is now listen on port", port)
})