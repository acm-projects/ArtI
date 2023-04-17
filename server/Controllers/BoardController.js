import createHttpError from 'http-errors'
import { Board, Image } from '../Models/boards.model.js'
import jwt from 'jsonwebtoken'
import { CreateImageRequestResponseFormatEnum } from 'openai'

async function getAllBoards(req, res, next) {
  try {
    const results = await Board.find({}, {})

    res.send(results)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

async function createNewBoard(req, res, next) {
  try {
    //Error handling
    //checks if user already has a board with the same name
    const boardNameExist = await Board.findOne({
      username: req.body.username,
      boardName: req.body.boardName,
    })
    if (boardNameExist) {
      res.status(400).json({
        message:
          'A board with this name already exists, please use a different name',
      })
      throw new Error(
        'From BoardController: A board with this name already exists, please use a different name.'
      )
    }

    const board = new Board(req.body)
    const result = await board.save()
    console.log('create new board success')
    res.send(result)
  } catch (error) {
    console.log(error.message)
    res.send(error.message)
  }
}

async function getUsersBoards(req, res, next) {
  try {
    const username = req.params.username

    const user = await Board.findOne({ username: username })
    if (!user) throw createHttpError(404, 'User does not exist to get boards')

    const board = await Board.find({ username: username }, {})
    console.log(`Getting boards for '${username}' was successful`)

    res.status(200).send(board)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

async function getSingleBoard(req, res, next) {
  try {
    const username = req.params.username
    const boardName = req.params.boardName

    //Error handling
    if (!(await Board.findOne({ username: username })))
      throw createHttpError(404, 'User does not exist to get a single board')

    if (
      !(await Board.findOne({ username: username, boardName: boardName }, {}))
    ) {
      throw createHttpError(404, 'No board found.')
    }

    const board = await Board.find(
      { username: username, boardName: boardName },
      {}
    )
    res.send(board)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

async function deleteBoard(req, res, next) {
  try {
    const username = req.params.username
    const boardName = req.body.boardName

    //error handling
    if (!(await Board.findOne({ username: username })))
      throw createHttpError(404, 'User does not exist to delete a board')

    if (!(await Board.findOne({ username: username, boardName: boardName }))) {
      throw createHttpError(404, 'Board not found.')
    }

    const result = await Board.findOneAndDelete({
      username: username,
      boardName: boardName,
    })
    console.log(`Deleting board for '${username}' was successful`)
    res.send(result)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

async function addOrDeleteImage(req, res, next) {
  try {
    const username = req.params.username
    const boardName = req.body.boardName
    let imageUpdates = req.body.imageUpdates
    const shouldDelete = req.body.deleteImage // this variable controls whether we are adding or deleting an image from the board
    const isCustomThumbnail = req.body.isCustomThumbnail
    const options = { new: true }

    //Error handling
    if (!(await Board.findOne({ username: username })))
      throw createHttpError(404, 'User does not exist.')

    if (
      !(await Board.findOne({ username: username, boardName: boardName }, {}))
    )
      throw createHttpError(
        404,
        `Board with name of "${boardName}" from "${username} was not found."`
      )

    //Gets the thumbnail from the user's board the Mongoose® way
    const findThumbnail = await Board.aggregate([
      { $match: { username: username, boardName: boardName } },
      { $project: { thumbnail: 1 } },
    ])
    let thumbnail = findThumbnail[0].thumbnail

    const findImages = await Board.aggregate([
      { $match: { username: username, boardName: boardName } },
      { $project: { images: 1 } },
    ])
    const imageArray = findImages[0].images

    for (let i = 0; i < imageArray.length; i++) {
      console.log(`image id at ${i}: ${imageArray[i].id}`)
    }

    if (!shouldDelete) {
      imageUpdates = imageUpdates.map((image) => {
        let theImage = JSON.parse(image)
        return new Image({
          id: theImage.id,
          data: Buffer.from(theImage.data, 'base64'),
          contentType: 'image/png',
          prompt: theImage.prompt,
        })
      })
    }

    //deletes the selected imageurl from the array
    function deleteImageFromArray(imageArray, imageUpdates) {
      for (let i = 0; i < imageArray.length; i++) {
        let index = -1
        for (let j = 0; j < imageUpdates.length; j++) {
          if (imageArray[i].id === imageUpdates[j]) {
            index = i
          }
          if (index > -1) {
            imageArray.splice(i, 1)
          }
        }
      }
      return imageArray
    }

    //adding new image to array
    function insert(imageArray, imageUpdates) {
      for (let i = 0; i < imageUpdates.length; i++) {
        imageArray.push(imageUpdates[i])
      }
      return imageArray
    }

    //If user is deleting the thumbnail from the board, set the thumbnail to the
    //last image in the board
    function isThumbnailDeleted(imageArray, imageUpdates) {
      if (imageArray.length == 0) return

      for (let i = 0; i < imageUpdates.length; i++) {
        if (imageUpdates[i] === thumbnail.id) {
          return imageArray[imageArray.length - 1]
        }
      }

      return thumbnail
    }

    //If user has already set a custom thumbnail, adding or deleting will not change the thumbnail
    if (isCustomThumbnail) {
      const result = await Board.findOneAndUpdate(
        {
          username: username,
          boardName: boardName,
        },
        {
          images: shouldDelete
            ? deleteImageFromArray(imageArray, imageUpdates)
            : insert(imageArray, imageUpdates),

          //if the thumbnail is the image being deleted, make the thumbnail the last added photo
          thumbnail: shouldDelete
            ? isThumbnailDeleted(imageArray, imageUpdates)
            : thumbnail,
        },
        options
      )

      res.send(result)
    }
    //If user has not set custom thumbnail, make the thumbnail the last picture
    else {
      const result = await Board.findOneAndUpdate(
        {
          username: username,
          boardName: boardName,
        },
        {
          images: shouldDelete
            ? deleteImageFromArray(imageArray, imageUpdates)
            : insert(imageArray, imageUpdates),

          //if user is deleting, sets the thumbnail to the picture before it, else when adding,
          //set the thumbnail to the added picture
          thumbnail: shouldDelete
            ? imageArray[imageArray.length - 1]
            : imageUpdates[imageUpdates.length - 1],
        },
        options
      )

      res.send(result)
    }
  } catch (error) {
    console.log(error)
    console.log(error.message)
    next(error)
  }
}

async function changeThumbnailOrBoardName(req, res, next) {
  try {
    const username = req.params.username
    const boardName = req.params.boardName
    const newBoardName = req.body.newBoardName
    const update = req.body.newThumbnailUrl
    const options = { new: true }

    //Error handling
    if (!(await Board.findOne({ username: username })))
      throw createHttpError(404, 'User does not exist.')

    if (
      !(await Board.findOne({ username: username, boardName: boardName }, {}))
    ) {
      throw createHttpError(404, 'No board found.')
    }

    function updateBoardName() {
      if (boardName == newBoardName) {
        return boardName
      }
      return newBoardName
    }

    const result = await Board.findOneAndUpdate(
      {
        username: username,
        boardName: boardName,
      },
      {
        thumbnail: update,
        customThumbnail: true,
        boardName: updateBoardName(),
      },
      options
    )

    res.send(result)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

export {
  getAllBoards,
  createNewBoard,
  getUsersBoards,
  getSingleBoard,
  deleteBoard,
  addOrDeleteImage,
  changeThumbnailOrBoardName,
}
