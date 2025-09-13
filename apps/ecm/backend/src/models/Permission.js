const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

       product_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }

})




const Permission = mongoose.model("Permission", permissionSchema);


module.exports ={Permission}