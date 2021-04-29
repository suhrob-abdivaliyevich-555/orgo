const {sign, verify } = require('jsonwebtoken')

const Path = require('path')

require('dotenv').config(Path.join(__dirname, ".env"))

function generetaJsonWebToken(data){
    return sign(data, process.env.SECRET_WORD)
}

function checkJsonWebToken(hash){
    try{
        return verify(hash, process.env.SECRET_WORD)
    }catch(e){
        return false
    }
}

module.exports = {
    generetaJsonWebToken, checkJsonWebToken
}