const express = require('express')
const collectionRouter = express.Router()
const taskRouter = express.Router()

const {fetchSingleCollection, addToDo, deleteCollection} = require('../controllers/collectionControllers')
const {authenticateUser} = require("../controllers/userControllers")

collectionRouter.get('/:collectionId', authenticateUser, fetchSingleCollection)
.post('/:collectionId', addToDo)
.delete('/:collectionId', deleteCollection)

module.exports = collectionRouter