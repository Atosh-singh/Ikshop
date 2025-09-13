const mongoose = require('mongoose ');

const commentSchema = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.types.ObjectId,
        required: true,
        ref:"User"
    },
     post_id:{
        type: mongoose.Schema.types.ObjectId,
        required: true,
        ref:"Post"
    },
   

})


const Comment  = mongoose.model("Comment",commentSchema);


module.exports = {Comment}