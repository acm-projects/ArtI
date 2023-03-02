const db;
const user;

//// BOARDS /////

// Finding boards of the user
const boards = db.boards.find({username: user.username});

// User creating a new board
db.boards.insert({
  username: user.username,
  name: boardName,
  images: []
})

// User updating board -- insertin image in board
db.boards.updateOne({username: user.username, name: matchingBoardName}, {
  $set:{
    images: ['', ''] // add a new url
  }
})

// User deleting board
db.boards.deleteOne({username: user.username, name: boardName})

// User deleting image
db.boards.updateOne({username: user.username, name: matchingBoardName}, {
  $set:{
    images: findAndDelete(imageURL) // delete a new url
  }
})

// Finds image url and deletes it from array, return new array
function findAndDelete(imageURL){
  return [];
}

// Creating new user
db.boards.insert({
  username: username,
  email: email
  first_name: first_name
  last_name: last_name
  password: password
  profile_picture: profile_picture
  settings: settings
})