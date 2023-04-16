const mongoose = require('mongoose')

const railwaySchema = new mongoose.Schema({
  tname: {
    type: String,
    required: true
  },
   tno: {
    type: Number,
    required: true,
    unique: [true, "Email address already taken"]
  },
  dtime:{
    type:String,
    required:true
  },
  seatavailable:{
    type:Array,
    required:true
  },
  price:{
    type:Array,
    required:true
  },
  delayedt:{
    type:Number,
    required:true
  }
 
})

module.exports = mongoose.model('railway', railwaySchema)