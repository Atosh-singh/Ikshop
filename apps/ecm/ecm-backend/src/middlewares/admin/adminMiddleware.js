

const onlyAdminAccess = async (req, res, next) =>{
     try {
console.log("Only Admin Access",req.user)
if(req.user.role != 1){
    return res.status(400).json({
            success: false,
            msg: "You haven't access to this permission!"
        }) 
}
          
      }catch(error){
        return res.status(500).json({
            success: false,
            msg: "Something went wrong!"
        })
    }

    return next()
}


module.exports = {
    onlyAdminAccess
}