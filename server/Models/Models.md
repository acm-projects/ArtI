This has the schema for the different collections: boards and user

# User

- everything else is required to sign up
- profilePicture is a url string and is not required
- settings is set to just be some type of object for now since we don't know what it will contain

# Board

- username is needed to know that that board is owned by that user
- images is an array of url strings, it might be sorted when updated/inserted so that searching for image is easier (searching is for deleting)
- thumbnail is default as the last image in the images array, but can be set later by the user
