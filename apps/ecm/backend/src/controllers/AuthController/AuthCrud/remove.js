// controllers/AuthController/AuthCrud/remove.js
const { User } = require('@/models/User');

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete user (mark as removed and disabled)
    const user = await User.findByIdAndUpdate(
      id,
      { 
        removed: true, 
        removedAt: new Date(),
        enabled: false  // Disable user account
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User removed successfully (soft delete)",
      data: user
    });

  } catch (error) {
    console.error("Error removing user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};






const deleteUser = async(req, res) =>{

  try {

    const users= req.body;

   const deleted =  await User.findByIdAndDelete(users._id);

   return res.status(200).json({
    success: true,
    message: "User Deleted",
    data: deleted
   })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }


} 



const getdata = async (req, res) =>{
  try {


const {id} = req.params; 


const userData = await User.findById(id);

return res.status(200).json({
  success: true,
  message:"Data get!",
  dataaaaa: userData
})


  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



module.exports = {
  deleteUser,
   removeUser,
   getdata
}