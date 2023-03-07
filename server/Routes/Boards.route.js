import express from 'express'

const router = express.Router()

import { Board } from '../Models/boards.model.js'

//Getting all boards in database
router.get('/', async (req, res, next) => {
    try {
        const results = await Board.find({}, {})

        res.send(results);

    } catch (error) {
        console.log(error.message);
    }
});

//Creating a new board
router.post('/', async (req, res, next) => {
    try {
        const board = new Board(req.body)
        const result = await board.save()

        res.send(result);

    } catch (error) {
        console.log(error.message);
    }
});

//Getting all the boards of one user
router.get('/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const board = await Board.find({ username: username }, {});

        res.send(board);

    } catch (error) {
        console.log(error.message);
    }
});

//Getting a specific board from one user
router.get('/:username/:boardName', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.params.boardName;

        const board = await Board.find({ username: username, boardName: boardName }, {});

        res.send(board)
    } catch (error) {
        console.log(error.message);
    }
});

//Delete a board
router.delete('/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.body.boardName

        const result = await Board.findOneAndDelete({
            username: username,
            boardName: boardName,
        });
        res.send(result);

    } catch (error) {
        console.log(error.message);
    }
});

//Adding and deleting one image to a board
router.patch('/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.body.boardName
        const imageArray = req.body.images
        const imageUrl = req.body.imageUrl
        const shouldDelete = req.body.deleteImage
        const isCustomThumbnail = req.body.isCustomThumbnail
        const options = { new: true };
        //Gets the thumbnail from the user's board the Mongoose® way
        const aggregate = await Board.aggregate([
            { $match: {username: username, boardName: boardName}},
            { $project: {thumbnail: 1}}
        ]);
        const thumbnail = aggregate[0].thumbnail;

        //If we want to delete, do delete function
        function deleteImageFromArray(imageArray, imageUrl) {
            const index = imageArray.indexOf(imageUrl);
            if (index > -1) {
                imageArray.splice(index, 1);
            }
            return imageArray
        };
        
        //adding new image to array
        function insert(imageArray, imageUrl) {
            imageArray.push(imageUrl)
            return imageArray
        };

        //If user is deleting the thumbnail from the board, set the thumbnail to the 
        //last image in the board
        function isThumbnailDeleted(imageArray){
            if(imageUrl == thumbnail) {
                return imageArray[imageArray.length - 1]
            }
            else {
                return imageUrl
            }
        };

        //If user has already set a custom thumbnail, adding or deleting will not change the thumbnail
        if(isCustomThumbnail){
            const result = await Board.findOneAndUpdate(
            {
                username: username,
                boardName: boardName,
            },
            {
                images: shouldDelete ? deleteImageFromArray(imageArray, imageUrl) : insert(imageArray, imageUrl),
                thumbnail: shouldDelete ? isThumbnailDeleted(imageArray) : thumbnail
            },
                options
            );

            res.send(result);
        }
        //If use has not set custom thumbnail, make the thumbnail the last picture
        else{
            const result = await Board.findOneAndUpdate(
                {
                    username: username,
                    boardName: boardName,
                },
                {
                    images: shouldDelete ? deleteImageFromArray(imageArray, imageUrl) : insert(imageArray, imageUrl),
                    //if user is deleting, sets the thumbnail to the picture before it, else when adding,
                    //set the thumbnail to the added picture
                    thumbnail: shouldDelete ? imageArray[imageArray.length - 1] : imageUrl
                },
                    options
                );
    
                res.send(result);
        }
        

    } catch (error) {
        console.log(error.message);
    }
});

//Change the board thumbnail
router.patch('/:username/:boardName', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.params.boardName
        var update = req.body.thumbnailUrl
        var isCustomThumbnail = req.body.customThumbnail
        const imageArray = req.body.images
        const options = { new: true };

        //Make the thumbnail the last added image if user hasn't set
        //a custom thumnail already
        function makeThumbnailLastImage(){
            update = imageArray[imageArray.length - 1];
            return update
        };

        const result = await Board.findOneAndUpdate({
            username: username,
            boardName: boardName,
        },
        {
            thumbnail: isCustomThumbnail ? update : makeThumbnailLastImage(),
            customThumbnail: isCustomThumbnail ? true : false
        },
        options);
        
        res.send(result);

    } catch (error) {
        console.log(error.message);
    }

})

//Deleting an image from a board
// router.patch('/:username/:boardName/:imageUrl', async (req, res, next) => {
//     try {
//         const username = req.params.username
//         const boardName = req.params.boardName
//         const imageArray = req.body.images
//         const imageUrl = req.params.imageUrl
//         const options = { new: true }

//         //delete the given image url from the array
//         function deleteImageFromArray(imageArray, imageUrl) {
//             const index = imageArray.indexOf(imageUrl);
//             if (index > -1) {
//                 imageArray.splice(index, 1);
//             }
//             return imageArray
//         };

//         const result = await Board.findOneAndUpdate({
//             username: username,
//             boardName: boardName
//         },
//             {
//                 images: deleteImageFromArray(imageArray, imageUrl)
//             },
//             options
//         );

//         res.send(result);

//     } catch (error) {
//         console.log(error.message)
//     }

// })

export { router as BoardsRoute };