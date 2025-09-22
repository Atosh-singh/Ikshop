const mongoose = require('mongoose');


const RightSchema = new mongoose.Schema({

    staff_id:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Staff",
    }],
    right: {
    type: String,
    }

}, {timestamps: true});

const Right = mongoose.model("Right", RightSchema);
module.exports= {Right};