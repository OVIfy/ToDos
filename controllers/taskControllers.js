const { default: mongoose } = require("mongoose")
const {Collections} = require('../connections/schema')

const deleteTask = async (req,res) => {
    if(mongoose.isObjectIdOrHexString(req.params.collectionId) && mongoose.isObjectIdOrHexString(req.params.taskId)){
        // let collection = await Collections.findById(new mongoose.Types.ObjectId(req.params.collectionId))
        let collection = await Collections.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.collectionId), 
        {
            $pull : {toDos : {_id : new mongoose.Types.ObjectId(req.params.taskId)}}
        })
        console.log(collection)
        res.redirect("/collection/" + req.params.collectionId)
    }else{
        res.render('pages/noSuch',{name : req.session.user.username, type : '400'})
    }
}

const editTask = async (req, res) => {
    if(mongoose.isObjectIdOrHexString(req.params.collectionId) && mongoose.isObjectIdOrHexString(req.params.taskId)){
        // let collection = await Collections.findById(new mongoose.Types.ObjectId(req.params.collectionId))
        let collection = await Collections.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.collectionId), 
        {
            $set : {"toDos.$[element].task" : req.body.name}
        },{
            arrayFilters : [{"element._id" : new mongoose.Types.ObjectId(req.params.taskId)}]
        })
        console.log(collection)
        res.redirect("/collection/" + req.params.collectionId)
    }else{
        res.render('pages/noSuch',{name : req.session.user.username, type : '400'})
    }
}

const slashTask = async (req, res) => {
    if(mongoose.isObjectIdOrHexString(req.params.collectionId) && mongoose.isObjectIdOrHexString(req.params.taskId)){
        // let collection = await Collections.findById(new mongoose.Types.ObjectId(req.params.collectionId))
        let collection = await Collections.findById(new mongoose.Types.ObjectId(req.params.collectionId))

        collection.toDos.forEach(todo => {
            if(todo.id == req.params.taskId){
                todo.state = !todo.state
            }
        })

        await Collections.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.collectionId),{$set : {toDos : collection.toDos}})
        console.log(collection)
        res.redirect("/collection/" + req.params.collectionId)
    }else{
        res.render('pages/noSuch',{name : req.session.user.username, type : '400'})
    }
}

module.exports = {deleteTask, editTask, slashTask}