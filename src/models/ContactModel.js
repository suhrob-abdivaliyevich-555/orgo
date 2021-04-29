const database = require('../modules/mongo')
const Schema = require('mongoose').Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    phone_number: {
        type: Number,
        required: true,
        trim: true
    },
    msg_subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

async function UserModel () {
    let db = await database()
    return await db.model('contact', UserSchema)
}

async function createContactUser(first_name, last_name, email, phone_number, msg_subject, message) {
    const db = await UserModel()
    return await db.create({
        first_name, last_name, email, phone_number, msg_subject, message
    })
}

async function findUser(email){
    let answer = ({ email})
    const db = await UserModel()
    return await db.findOne(answer)
}

module.exports = {
    createContactUser, findUser
}