require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
var session = require('express-session')
const MongoStore = require('connect-mongo');
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const connectToDB = require('./connections/connect')
const port = 3000

//setting up ejs
app.set('view engine', 'ejs');

//moduler Routers
const {signUpRouter, signInRouter, homeRouter} = require('./routes/userRouter')
const collectionRouter = require("./routes/CollectionRouter")
const taskRouter = require("./routes/taskRouter")


//middleswares
const loader = require('./middlewares/middlewares')

//setting up express
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({mongoUrl : "mongodb+srv://ovifeanyichukwu:MRHOGudzqx8csber@cluster0.bhdk1ko.mongodb.net/ToDo?retryWrites=true&w=majority"}),
  resave: false,
  maxAge : 6000,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(loader)

app.get('/', (req, res) => {
  res.redirect('/signup')
})

app.post('/logout',(req,res) => {
  req.session.destroy(function(err) {
    res.redirect('/signin')
  })
})
app.use('/signup', signUpRouter)
app.use('/signin', signInRouter)
app.use('/home', homeRouter)
app.use('/collection', collectionRouter)
app.use('/collection', taskRouter)
app.get('*', function(req, res){
  res.status(404).render('pages/noSuch', {type : 'root', name : req.session.user.username});
});


// app.use('/todos',)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log(process.env.DATABASE)

connectToDB(process.env.MONGO_URI)
.catch(error => console.log(error))
