const express = require('express')
const path = require('path')
const signUpRouter = express.Router()
const homeRouter = express.Router()
const signInRouter = express.Router()

//controllers
const {registerUser, logUserIn, authenticateUser} = require('../controllers/userControllers')
const {createCollection, fetchCollections} = require("../controllers/collectionControllers")

const signAuthenticator = (req, res, next) => {
    if(req.session.user){
        res.redirect('/home')
    }
    else{
        next()
    }
}

//all signUp Routes
signUpRouter.route('/')
.get(signAuthenticator, (req,res)=> res.render('pages/signUp',{errorMessage : ''}))
.post(registerUser)


signInRouter.route('/')
.get(signAuthenticator, (req,res)=> res.render('pages/signIn',{errorMessage : ''}))
.post(logUserIn)


homeRouter.route('/').get(authenticateUser, fetchCollections)
.post(createCollection)

module.exports = {signUpRouter, signInRouter, homeRouter}

