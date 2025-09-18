const express = require('express');

const router = express.Router();


const {createPost} = require('../controllers/postController')



const {authenticate} = require('../middlewares/authenticate')
const {postAddcheckValidator} = require('../middlewares/validators/adminValidator')


router.post('/create-post', authenticate,postAddcheckValidator, createPost)


module.exports = router;