const {Collections} = require('../connections/schema')
const {createApi} = require('unsplash-js')
const { Schema, default: mongoose } = require('mongoose');


const serverApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const createCollection = async (req, res) => {
    let imageUrl = ''
    if(req.body.image){
        imageUrl = req.body.image
    }
    else{
        if(req.body.keyword){
            try {
                let unsplashResponse = await serverApi.search.getPhotos({query : req.body.keyword})
                if(unsplashResponse.response.results.length > 0){
                    imageUrl = unsplashResponse.response.results[0].urls.small_s3
                }
                else{
                    let randomResponse = await serverApi.photos.getRandom({count : 1})
                    imageUrl = randomResponse.response[0].urls.small_s3

                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    await Collections.create({
        userId : req.session.user.id, 
        name : req.body.name, 
        imgURL : imageUrl
    })
    res.redirect('/home')
}

const fetchCollections = async (req, res) => { 
    let userCollections = await Collections.find({userId : req.session.user.id})
    res.render('pages/dash', {name : req.session.user.username, collections : userCollections, message : 'successfully signed in'})
}

const fetchSingleCollection = async (req, res) => {
    console.log(req.params.collectionId)

    if(mongoose.isObjectIdOrHexString(req.params.collectionId)){
        let mongoId = new mongoose.Types.ObjectId(req.params.collectionId)

        const collection = await Collections.findOne({_id : mongoId})
    
        if(collection)
        res.render('pages/collection',{collectionName : collection.name, name : req.session.user.username, collection : collection})
    }else{
        // let previousUrl = req.headers.referer || '/home'
        // res.redirect(previousUrl)

        res.render('pages/noSuch',{name : req.session.user.username, type : '404'})
    }
    
   
}

const deleteCollection = async (req, res) => {
    if(mongoose.isObjectIdOrHexString(req.params.collectionId)){
        let mongoId = new mongoose.Types.ObjectId(req.params.collectionId)

        const collection = await Collections.findByIdAndDelete({_id : mongoId})

        res.redirect('/home')
    }else{
        res.render('pages/noSuch',{name : req.session.user.username, type : '400'})
    }
}

const addToDo = async (req, res) => {
    let collectionId = new mongoose.Types.ObjectId(req.params.collectionId) //id gotten from the url and changing it to the from mongoDB accepts
    await Collections.findOneAndUpdate({_id : collectionId},{$push : {toDos : {task : req.body.name, state : false}}})

    res.redirect('/collection/' + req.params.collectionId)

    console.log(req.body)
}

module.exports = {createCollection, fetchCollections, fetchSingleCollection, addToDo, deleteCollection}