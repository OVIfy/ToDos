const loader = (req, res, next) => {
    let intervalID
    if(process.env.DATABASE == "connected"){
        clearInterval(intervalID)
        next()
    }
    else{
      intervalID = setInterval(()=>{
            console.log(process.env.DATABASE)
            if(process.env.DATABASE == "connected"){
                clearInterval(intervalID)
                next()
            }
        }, 1000)
    }
}

module.exports = loader