const mongoose = require('mongoose');


const staffSchema = new mongoose.Schema({
name:{
    type: String,
    required: true,
    trim: true,
},
email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: 'Invalid email format',
    },
}
}, {timestamps: true});

const Staff = mongoose.model("Staff", staffSchema);
module.exports= {Staff};