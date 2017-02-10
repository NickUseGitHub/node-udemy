const express = require('express');

const app = new express();
const port = process.env.PORT || 3002;

app.get('/', function(req, res){
    res.send("Hello world");
})

app.listen(port, function(err){
    if (err) {
        console.log(err);
    }

    console.log("app is now listen on port", port);
});