//const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async(req,res,next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('no token')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {id, username} = decoded
        //console.log(decoded);
        req.user = {id, username}
        next()
    } catch (error) {
        throw new UnauthenticatedError('not authorized to access this route')
    }

    
}

module.exports = authenticationMiddleware