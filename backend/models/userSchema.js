const mongoose =  require('mongoose');
const { Schema } = mongoose;

//schema for Database
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  
//   const User = mongoose.model('USER', userSchema);

 module.exports = mongoose.model('USER', userSchema);
