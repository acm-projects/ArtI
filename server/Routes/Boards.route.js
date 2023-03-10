import express from 'express'
import createHttpError from 'http-errors';

const router = express.Router()

import { Board } from '../Models/boards.model.js'

//Getting all boards in database
router.get('/', async (req, res, next) => {
    try {
        const results = await Board.find({}, {})

        res.send(results);

    } catch (error) {
        console.log(error.message);
        next(error)
    }
});

//Creating a new board for a user
router.post('/', async (req, res, next) => {
    try {

        //Error handling
        //checks if user already has a board with the same name
        const boardNameExist = await Board.findOne({username: req.body.username, boardName: req.body.boardName})
        if(boardNameExist){
            return res.status(409).send({
                message: "A board with this name already exists, please use a different name."
            })
        }
        
        const board = new Board(req.body)
        const result = await board.save()
        res.send(result);

    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

//Getting all the boards of one user
router.get('/:username', async (req, res, next) => {
    try {
        const username = req.params.username

        if(!await Board.findOne({username: username}))
            throw createHttpError(404, "User does not exist.")

        const board = await Board.find({ username: username }, {});

        res.send(board);

    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

//Getting a specific board from one user
router.get('/:username/:boardName', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.params.boardName;

        //Error handling
        if(!await Board.findOne({username: username}))
            throw createHttpError(404, "User does not exist.")

        if(! await Board.findOne({ username: username, boardName: boardName }, {})){
            throw createHttpError(404, "No board found.")
        }

        const board = await Board.find({ username: username, boardName: boardName }, {});
        res.send(board);

    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

//Deleting a whole board
router.delete('/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.body.boardName

        //error handling
        if(!await Board.findOne({username: username}))
            throw createHttpError(404, "User does not exist.")

        if(! await Board.findOne({username: req.params.username, boardName: req.params.boardName})){
            throw createHttpError(404, "Board not found.")
        }

        const result = await Board.findOneAndDelete({
            username: username,
            boardName: boardName,
        });
        res.send(result);

    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

//Adding and deleting one image to a board. Also controlls updates for the thumbnail of the board based on if the 
//board has a custom thumbnail or not. If no custom thumbnail/if deleting the thumbnail -> most recent added board will
//become thumbnail, if deleting last image -> new last image becomes board
//Need to work on - if board only has 1 item, deleting it will set board image to default
router.patch('/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.body.boardName
        const imageArray = req.body.images
        //const image = req.body.image
        const imageUpdates = req.body.imageUpdates
        const shouldDelete = req.body.deleteImage // this variable controls whether we are adding or deleting an image from the board
        const isCustomThumbnail = req.body.isCustomThumbnail 
        const options = { new: true };

        //Error handling
        if(!await Board.findOne({username: username}))
            throw createHttpError(404, "User does not exist.")

        if(! await Board.findOne({ username: username, boardName: boardName }, {})){
            throw createHttpError(404, "No board found.")
        }
        //Gets the thumbnail from the user's board the Mongoose® way
        const aggregate = await Board.aggregate([
            { $match: {username: username, boardName: boardName}},
            { $project: {thumbnail: 1}}
        ]);
        const thumbnail = aggregate[0].thumbnail;

        //deletes the selected imageurl from the array
        function deleteImageFromArray(imageArray, imageUpdates) {

            for(let i = 0; i < imageArray.length; i++){
                let index = -1; 
                for(let j = 0; j < imageUpdates.length; j++){
                    if(imageArray[i].url == imageUpdates[j].url){
                        index = i
                    }
                    if (index > -1) {
                        imageArray.splice(i, 1);
                    }
                }
                
            }
            return imageArray
        };
        
        //adding new image to array
        function insert(imageArray, imageUpdates) {
            for(let i = 0 ; i < imageUpdates.length; i++){
                imageArray.push(imageUpdates[i])
            }
            return imageArray
        };

        //If user is deleting the thumbnail from the board, set the thumbnail to the 
        //last image in the board
        function isThumbnailDeleted(imageArray, imageUpdates){
            if(imageArray.legnth == 0) return;

            for(let i = 0; i < imageUpdates.length; i++){
                if(imageUpdates[i].url == thumbnail){
                    return imageArray[imageArray.length - 1].url;
                }
            }

            return thumbnail
        };

        //If user has already set a custom thumbnail, adding or deleting will not change the thumbnail
        if(isCustomThumbnail){
            const result = await Board.findOneAndUpdate(
            {
                username: username,
                boardName: boardName,
            },
            {
                images: shouldDelete ? deleteImageFromArray(imageArray, imageUpdates) : insert(imageArray, imageUpdates),
                
                //if the thumbnail is the image being deleted, make the thumbnail the last added photo
                thumbnail: shouldDelete ? isThumbnailDeleted(imageArray, imageUpdates) : thumbnail
            },
                options
            );

            res.send(result);
        }
        //If user has not set custom thumbnail, make the thumbnail the last picture
        else{
            const result = await Board.findOneAndUpdate(
                {
                    username: username,
                    boardName: boardName,
                },
                {
                    images: shouldDelete ? deleteImageFromArray(imageArray, imageUpdates) : insert(imageArray, imageUpdates),

                    //if user is deleting, sets the thumbnail to the picture before it, else when adding,
                    //set the thumbnail to the added picture
                    thumbnail: shouldDelete ? imageArray[imageArray.length - 1].url : imageUpdates[imageUpdates.length -1].url
                },
                    options
                );
    
                res.send(result);
        }
        

    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

//Change the board thumbnail or board name
router.patch('/:username/:boardName', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.params.boardName
        const newBoardName = req.body.newBoardName
        const update = req.body.newThumbnailUrl
        const options = { new: true };

        //Error handling
        if(!await Board.findOne({username: username}))
            throw createHttpError(404, "User does not exist.")

        if(! await Board.findOne({ username: username, boardName: boardName }, {})){
            throw createHttpError(404, "No board found.")
        }

        function updateBoardName(){
            if(boardName == newBoardName){
                return boardName
            }
            return newBoardName

        };

        const result = await Board.findOneAndUpdate({
            username: username,
            boardName: boardName,
        },
        {
            thumbnail: update,
            customThumbnail: true,
            boardName: updateBoardName()
        },
        options);
        
        res.send(result);

    } catch (error) {
        console.log(error.message);
        next(error);
    }

});

export { router as BoardsRoute };