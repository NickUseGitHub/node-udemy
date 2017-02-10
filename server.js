import express from 'express'
import path from 'path'

const app = new express()
const port = process.env.PORT || 3002

app.set('views', path.resolve(__dirname, './app/views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {
      name: 'nick'
    })
})

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }

    console.log("app is now listen on port", port)
})