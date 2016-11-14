'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var port = process.env.PORT || 8000;

// Routes
app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) { // read pets.JSON
        if (err) { // check for failure & report if any
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
        }
        // If file read good then display pets array
        var pets = JSON.parse(petsJSON);
        res.setHeader('Content-Type', 'application/json');
        res.send(pets);
    });
});
// app.get(ROUTE) follows same pattern as above for the remaining app.get method calls 
app.get('/pets/0', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
        }
        // Output
        var pets = JSON.parse(petsJSON); // parse JSON
        res.setHeader('Content-Type', 'application/json'); // set header type
        res.send(pets[0]); // display pets element 0
    });
});

app.get('/pets/1', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
        }
        var pets = JSON.parse(petsJSON);
        res.setHeader('Content-Type', 'application/json');
        res.send(pets[1]);
    });
});

   // catch-all 404 page
app.use(function(req, res, next){ res.type('text/plain');
            res.status(404);
            res.send('404 - Not Found');
});


app.listen(port, function() {
    console.log('Listening on port', port);
});
