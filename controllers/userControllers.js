const path = require('path')
const {User} = require('../connections/schema')

const registerUser = (req, res) => {
    // console.log(req.body)
    /*
    this is a static function registered on the mongoose schema thay registers new users to
    the mongoDB database and hashes their passwords using bcrypt before it does.

    trim() is used to remove trailing whitespace
    */
    User.createUser({userName: req.body.username.trim(), password: req.body.password})
    .then(createdUserObject => {
        console.log(createdUserObject)
        req.session.user = createdUserObject
        res.redirect('/home')
    })
    .catch(err => {
        res.render('pages/signUp', {errorMessage : err.message})
    })
}

const logUserIn = (req,res) => {

    User.logUser({userName:req.body.username.trim(), password:req.body.password})
    .then((userObject)=>{
        req.session.user = userObject

        req.session.save(function (err) {
            if (err) return next(err)
            res.redirect('/home')
        })
    })
    .catch(err => {
        console.log(err.message)
        res.render('pages/signIn', {errorMessage : err.message})
    })
}

//the authenticateUser middleware basically checks if theirs an active session
const authenticateUser = (req, res, next)=> {
    if(req.session.user)
        next()
    else
        res.redirect('/signin')
}

module.exports = {registerUser, logUserIn, authenticateUser}
