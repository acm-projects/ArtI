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
        const board = await Board.find({username: username},{});

     res.send(board);

  } catch (error) {
        console.log(error.message);
  }
});

//Getting a specific board from one user
router.get('/:username/:boardName', async (req, res, next) =>{
    try {
        const username = req.params.username
        const boardName = req.params.boardName;

        const board = await Board.find({username: username, boardName: boardName}, {});
    
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

//Adding one image to a board
router.patch('/:username/:boardName', async (req, res, next) => {
    try {
        const boardName = req.params.boardName
        const username = req.params.username
        const updates = req.body.images
        const newImageUrl = req.body.newImageUrl
        const options = {new: true};

        //add new image url to an updated array
        function insert(imageArray, imageUrl) {
            imageArray.push(imageUrl)
            return imageArray
        };

        const result = await Board.findOneAndUpdate(
        {
            username: username,
            boardName: boardName,
        },
        {
            images: insert(updates, newImageUrl),
        },
        options
        );

        res.send(result);

    } catch (error) {
        console.log(error.message);
  }
});

//Deleting an image from a board
router.patch('/:username/:boardName/:imageUrl', async (req, res, next) => {
    try {
        const username = req.params.username
        const boardName = req.params.boardName
        const imageArray = req.body.images
        const imageUrl = req.params.imageUrl
        const options = {new: true}

    //delete the given image url from the array
        function deleteImageFromArray(imageArray, imageUrl) {
            const index = imageArray.indexOf(imageUrl);
            if(index > -1){
                imageArray.splice(index, 1);
            }
            return imageArray
        };

        const result = await Board.findOneAndUpdate({
            username: username, 
            boardName: boardName
        },
        {
            images: deleteImageFromArray(imageArray, imageUrl)
        },
            options
        );

        res.send(result);

    } catch (error) {
        console.log(error.message)
    }

})

//Change the board thumbnail
// router.patch('/username/:boardName/:thumbnail/:customThumbnail', async (req, res, next) =>{
//     try {
//         const username = req.params.username
//         const boardName = req.params.boardName
//         const update = req.body.thumbnail
//         const customThumbnail = req.params.customThumbnail
//         const imageArray = req.body.images
//         const options = {new: true};

//         //Make the thumbnail the last added image if user hasn't set
//         //a custom thumnail already
//         if(update == req.params.thumbnail && customThumbnail == false){
//             update = req.body.imageArray[imageArray.length -1];

//             const result = await Board.findOneAndUpdate({
//                 username: username,
//                 boardName: boardName,
//             },
//             {
//                 thumbnail: update
//             },
//             options)
//         }
//         //Make thumbnail the custom thumbnail
//         else {
//             const result = await Board.findOneAndUpdate({
//                 username: username,
//                 boardName: boardName
//             },
//             {
//                 thumbnail: update,
//                 customThumbnail: true
//             },
//             options);
//         }

//         res.send(result);
        
//     } catch (error) {
//         console.log(error.message);
//     }

// })

export { router as BoardsRoute };