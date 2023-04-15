const express = require('express')
const taskRouter = express.Router()
const {deleteTask, editTask, slashTask} = require('../controllers/taskControllers')

// taskRouter.get(,)
// .delete('/:collectionId/task/:taskId', )

taskRouter.route('/:collectionId/task/:taskId')
.delete(deleteTask)
.put(editTask)
.patch(slashTask)

module.exports = taskRouter