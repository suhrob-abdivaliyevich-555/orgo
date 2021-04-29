const bcrypt = require('bcrypt');

function generateCrypt(data){
    const soltRound = bcrypt.genSaltSync(10)
    const hash =  bcrypt.hashSync(data, soltRound)
    return hash
}

function compareCrypt(data, hash){
    return bcrypt.compareSync(data, hash)
}

module.exports = {
    generateCrypt, compareCrypt
}