
if(process.env.NODE_ENV === "development"){
  const dotenv = require('dotenv')
  dotenv.config()
}

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false) 
mongoose.connect(url)

module.exports = mongoose