const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()

const Board = require('../Models/boards.model');
const { TopologyDescription } = require('mongodb');

//Getting all boards in database
router.get('/', async(req, res, next) => {
    try {
        const results = await Board.find({},{});
        res.send(results)
    } catch (error) {
        console.log(error.message)
    }
});

//Creating a new board
router.post('/', async(req, res, next) => {
    try{
        const board = new Board(req.body)
        const result = await board.save()
        res.send(req.body);
    }
    catch(error){
        console.log(error.message)
    }
});

//Getting a board by ID (username)
router.get('/:username', async(req, res, next) => {
    try{
        const username = req.params.username

        res.send(username)
    }
    catch(error){
        console.log(error.message)
    }
})

module.exports = router;