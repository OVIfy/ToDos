const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const saltRounds = 10

//Users
const userSchema = new Schema({userName : String, password : String}, {
    statics:{
        async createUser({userName, password}){
            let user = await this.findOne({userName : new RegExp('^' + userName + '$', "i")})
            
            // console.log(user)
            if(user){
                throw new Error("UserName already in use")
            }

            if(!userName || !password){
                throw new Error("UserName and password must be provided")
            }

            if(password.length < 6){
                throw new Error("password must be greater than 6 characters")
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds) 

            let createdUser = await this.create({userName,password : hashedPassword})

            // console.log(createdUser)
            return {username : createdUser.userName, id : createdUser.id}
        },

        async logUser({userName, password}){
            console.log(userName)

            let user = await this.findOne({userName : new RegExp('^' + userName + '$', "i")})


            if(!user){
                throw new Error(`${userName} does not exist in our Database`)
            }


            if(user){ //check hashed password in db with new password provided by user
                const match = await bcrypt.compare(password, user.password)
                if(!match){
                    throw new Error(`Incorrect password`)
                }
                else{
                    return {username : user.userName, id : user.id}
                }
            }
        }
    }
})
 
const User = mongoose.model('User',userSchema)


//todoItems
const toDoSchema = new Schema({
    task : String,
    state : Boolean
})

const ToDoItem = mongoose.model('ToDoItem', toDoSchema)


//Collections
const collectionSchema = new Schema({
    userId : ObjectId,
    name : String,
    imgURL : String,
    toDos : [toDoSchema]
})

const Collections = mongoose.model('Collection', collectionSchema)

module.exports = {User, ToDoItem, Collections}