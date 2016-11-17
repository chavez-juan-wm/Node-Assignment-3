var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promos = require('../models/Promotions');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

    .get(function(req,res,next){
        promos.find({}, function (err, dish){

            if(err) throw err;
            res.json(dish);

        })
    })

    .post(function(req, res, next){
        promos.create(req.body, function (err, dish){

            if(err) throw err;
            console.log('Dish create!');
            var id = dish._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the dish with id: ' + id);
        })
    })

    .delete(function(req, res, next){
        promos.remove({}, function (err, resp){
            if(err) throw err;
            res.json(resp);
        })
    });

promoRouter.route('/:promoId')

    .get(function(req,res,next){
        Dishes.find({ "name" : req.params.promoId }, function (err, dish){
            if(err) throw err;
            res.json(dish);
        })
    })

    .put(function(req, res, next){
        promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        }, function(err, dish){
            if(err) throw err;
            res.json(dish);
        })
    })

    .delete(function(req, res, next){
        promos.findByIdAndRemove(req.params.promoId, function (err,resp){
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = promoRouter;