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