const mongoose = require('mongoose ');

const likeSchema = new mongoose.Schema({

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


const Like  = mongoose.model("Like",likeSchema);


module.exports = {Like}