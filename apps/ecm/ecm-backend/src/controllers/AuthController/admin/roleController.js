const {Role}= require("../../../models/Role")

const {validationResult} = require('express-validator');



const storeRole = async (req, res) =>{

   try{

         const errors = validationResult(req);

         if(!errors.isEmpty()){
        return res.status(200).json({
            success: false,
            msg:"Errors",
            errors: errors.array()
        })
    }
    
const {name, value}= req.body;

  const role =  new Role({
        name,
        value
    })

    const roleData = await role.save();
 return res.status(200).json({
            success: true,
            message: "Role successfully Added!",
            data:roleData
        })


    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
   
}





const getRoles = async (req, res) =>{
    try {

               const errors = validationResult(req);

         if(!errors.isEmpty()){
        return res.status(200).json({
            success: false,
            msg:"Errors",
            errors: errors.array()
        })
    }


   const roles = await Role.find({
value:{
  $ne:1  // admin , ye value return nhi karega baki kar de
}

      
 })

    return res.status(200).json({
            success: true,
            message: "Roles Fetched Successfully!",
            data: roles
        })
    
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    storeRole,
    getRoles
}