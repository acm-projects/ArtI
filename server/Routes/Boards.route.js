import express from 'express'
const router = express.Router()
import{
    getAllBoards, 
    createNewBoard, 
    getUsersBoards, 
    getSingleBoard, 
    deleteBoard, 
    addOrDeleteImage, 
    changeThumbnailOrBoardName
} from '../Controllers/BoardController.js'

//Getting all boards in database
router.get('/', getAllBoards);

//Creating a new board for a user
router.post('/', createNewBoard);

//Getting all the boards of one user
router.get('/:username', getUsersBoards);

//Getting a specific board from one user
router.get('/:username/:boardName', getSingleBoard);

//Deleting a whole board
router.post('/:username', deleteBoard);

//Adding and deleting one image to a board. Also controlls updates for the thumbnail of the board based on if the
//board has a custom thumbnail or not. If no custom thumbnail/if deleting the thumbnail -> most recent added board will
//become thumbnail, if deleting last image -> new last image becomes board
//Need to work on - if board only has 1 item, deleting it will set board image to default
router.patch('/:username', addOrDeleteImage);

//Change the board thumbnail or board name
router.patch('/:username/:boardName', changeThumbnailOrBoardName);

export { router as BoardsRoute };