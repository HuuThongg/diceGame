const express = require('express');
const db = require('mongodb');
const app = express();

app.get('/', function(req, res) {
    res.send('This is Homepage');
});

app.get('/login', (req, res) => {
    res.send('This is a login page');
});

app.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

const port = process.env.port || 3000;
app.listen(port, function() {
    console.log('Example app listening on port 3000!');
});