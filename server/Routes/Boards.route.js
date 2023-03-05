import express from 'express'
const router = express.Router()

import { Board } from '../Models/boards.model.js'

//Getting all boards in database
router.get('/', async (req, res, next) => {
  try {
    const results = await Board.find({}, {})
    res.send(results)
  } catch (error) {
    console.log(error.message)
  }
})

//Creating a new board
router.post('/', async (req, res, next) => {
  try {
    const board = new Board(req.body)
    const result = await board.save()
    res.send(req.body)
  } catch (error) {
    console.log(error.message)
  }
})

//Getting a board by ID (username)
router.get('/:username', async (req, res, next) => {
  try {
    const username = req.params.username

    res.send(username)
  } catch (error) {
    console.log(error.message)
  }
})

//Delete a board
router.delete('/:username', async (req, res, next) => {
  try {
    const username = req.params.username
    const boardName = req.body
    const result = await Board.findOneAndDelete({
      username: username,
      boardName: boardName,
    })
    res.send(result)
  } catch (error) {
    console.log(error.message)
  }
})

//Adding images to a board
router.patch('/:username', async (req, res, next) => {
  try {
    const boardName = req.body.boardName
    const username = req.params.username
    const updates = req.body.images
    const newImageUrl = req.body.newImageUrl

    function insert(imageArray, imageUrl) {
      imageArray.push(imageUrl)
      return imageArray
    }

    const result = await Board.findOneAndUpdate(
      {
        username: username,
        boardName: boardName,
      },
      {
        images: insert(newImageUrl),
      }
    )
  } catch (error) {
    console.log(error.message)
  }
})

export { router as BoardsRoute }
