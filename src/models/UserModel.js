const database = require('../modules/mongo')
const Schema = require('mongoose').Schema


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: true,
        trim: true
    },
    productCart: {
        type: Array
    },
    profileProduct: {
        type: Array
    },
    password: {
        type: String,
        required: true
    }
})

async function UserModel () {
    let db = await database()
    return await db.model('users', UserSchema)
}

async function createUser(username, email,  password) {
    const db = await UserModel()
    return await db.create({
        username, email, password
    })
}

async function findUser(login){
    let answer = ((login.includes('@')) ? { email: login} : { username: login})
    const db = await UserModel()
    return await db.findOne(answer)
}

async function findUserAuth(id){
    const db = await UserModel()
    return await db.findOne({_id: id})
}

async function updateUserPush(name, data){
    const db = await UserModel()
    return await db.update(
        { username: name },
        { $addToSet: { productCart: data } }
     )
}

async function updateProfilePush(name, data){
    const db = await UserModel()
    return await db.update(
        { username: name },
        { $addToSet: { profileProduct: data } }
     )
}

async function updateArray(id){
    const db = await UserModel()
    const findUser = await db.findById(id)

    findUser.productCart.push(`da978fsad978`)
    
}

async function updateUserRemove(name, data){
    const db = await UserModel()
    return await db.updateOne(
        { username: name },
        { productCart: data }
     )
}

async function updateProfileProduct(name, data){
    const db = await UserModel()
    return await db.updateOne(
        { username: name },
        { profileProduct: data }
     )
}


module.exports = {
    createUser, findUser, findUserAuth, updateUserPush, updateUserRemove, updateProfileProduct, updateProfilePush
}