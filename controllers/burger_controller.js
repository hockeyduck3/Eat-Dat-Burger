const express = require('express');
const router = express.Router();

const burger = require('../models/burger');

router.get('/', function(req, res) {
    burger.selectAll(function(data) {
        let object = {
            burgers: data
        };
        
        res.render('index', object);
    });
});

router.post('/burger', function(req, res) {
    burger.insertOne(
    [
        'burger_name',
    ], 
    
    [
        req.body.burger_name,
    ],
    
    function(data) {
        res.sendStatus(200).end();
    });
});

router.put('/burgers/:id', function(req, res) {
    let condition = `id = ${req.params.id}`;

    burger.updateOne(
    {
        devoured: true
    }, 
    
    condition, function(data) {
        console.log(data);
    });
});

module.exports = router;