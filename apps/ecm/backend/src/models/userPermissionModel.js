const mongoose = require('mongoose');

const userPermissionSchema = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },


    permissions:[{

        permission_name: String,
        permission_value:[String]   // create, read, edit, delete
    }]
})




const UserPermission = mongoose.model("Permission", userPermissionSchema);


module.exports ={UserPermission}