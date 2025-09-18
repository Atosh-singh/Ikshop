const {Post} = require('../../models/Post')
const {validationResult} = require("express-validator");

const createPost = async (req, res) => {
  try {

    const errors = validationResult(req);
 if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

const {title, description} = req.body;




const post =  new Post({
    title,
    description
})

if(req.body.categories){
    post.categories= req.body.categories
}


// const post =  new Post({
//     title,
//     description
// })


const postData = await post.save();


 return res.status(200).json({
      success: true,
      message:"Post Created Successfully!" ,
      data: postData
    });




  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = { createPost };
