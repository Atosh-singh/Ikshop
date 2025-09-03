const jwat = require("jsonwebtoken");

const config = process.env

const authenticate = async(req, res, next)  =>{


const token =     req.body.token || req.query.token || req.headers["authorization"];

if(!token){
    return res.status(403).json({
        success:false,
        msg: 'A token is required for authentication'

    })
}



try {

    const bearer = token.split(' ');
    const bearerToken = bearer[1];
    const decodedData = jwt.verify(bearerToken,config.JWT_SECRET)
    req.user = decodedData;



}catch(error){
    return res.status(401).json({
        success:false,
        msg: 'Invalid token is required for authentication'

    })
}

return next();
}

module.exports = authenticate