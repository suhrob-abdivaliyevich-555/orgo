const { findUserAuth } = require('../models/UserModel')
const { checkJsonWebToken } = require('../modules/jwt')

module.exports = async (req, res, next) => {
    let token = req.cookies?.token;
    if(token){
        let user = checkJsonWebToken(token) 
         user = await findUserAuth(user._id)
        if(user){
            req.user = {
                id: user._id,
                name: user.username,
                email: user.email
            }
        }
    }
    next();
}