const database = require('../modules/mongo')
const Schema = require('mongoose').Schema


const ProductSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    new_pricing: {
        type: Number,
        required: true,
    },
    old_pricing: {
        type: Number,
        required: true,
    },
    news: {
        type: String,
        required: true,
    },
    top: {
        type: String,
        required: true,
    },
    best: {
        type: String,
        required: true,
    },
    view: {
        type: String,
        required: true,
    },
    total_count: {
        type: Number,
        required: true,
    },
    product_message: {
        type: String,
        required: true
    },
    description_message: {
        type: String,
        required: true
    }
})

async function ProductModel () {
    let db = await database()
    return await db.model('product', ProductSchema)
}

async function createProduct(product_name, new_pricing, old_pricing, news, top, best, view, total_count, product_message, description_message) {
    const db = await ProductModel()
    return await db.create({
        product_name, new_pricing, old_pricing, news, top, best, view, total_count, product_message, description_message
    })
}

async function findNews(){
    let answer = ({ news: "true"})
    const db = await ProductModel()
    return await db.find(answer)
}
async function findTop(){
    let answer = ({ top: "true"})
    const db = await ProductModel()
    return await db.find(answer)
}
async function findBest(){
    let answer = ({ best: "true"})
    const db = await ProductModel()
    return await db.find(answer)
}

async function findView(){
    let answer = ({ view: "true"})
    const db = await ProductModel()
    return await db.find(answer)
}

async function findProduct(){
    const db = await ProductModel()
    return await db.find()
}
async function findOneProduct(id){
    const db = await ProductModel()
    return await db.findById(id)
}

module.exports = {
    createProduct, findNews, findTop, findBest, findView, findProduct, findOneProduct
}