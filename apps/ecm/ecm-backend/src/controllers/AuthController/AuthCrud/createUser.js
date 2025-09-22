const {User}= require('../../../models/User.js');
const {validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const randomstring = require('randomstring');
const {sendMail}=  require("../../../utils/mailer.js")



const createUser = async (req, res) => {
    try {

           const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ success: false, errors: errors.array() });
            }
        
 const {
      fullname,
      username,
      email,
      phone,
     } = req.body;

       const isExist = await User.findOne({
            email
        })

        if(isExist){
             return res.status(400).json({
            success: false,
            message:"Email is already exist!"
        })
        }


         //  Generating Password

const password = randomstring.generate(6);
       
        // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
        
var obj = {
   username,
      email,
      fullname,
      password: hashedPassword,
      
      phone,

}

    if (req.body.role && req.body.role == 1) {
      return res.status(400).json({
        success: false,
        message: "You can't create Admin!",
      });
    } else if (req.body.role) {
      obj.role = req.body.role;
    }

 const user = new User(obj);
    const userData = await user.save();
    console.log(password);  // Log the generated password for testing



   const content = `
  <p>Your account has been created. Your password is: <strong>${password}</strong></p>
  <p>Please change your password after logging in.</p>
  ...
`;
await sendMail(userData.email, "Account Created", content);

return res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: userData,
    });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createUser
}