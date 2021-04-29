const express = require('express')
const CookieParser = require('cookie-parser')
const Path = require('path')
const Fs = require('fs')

require('dotenv').config({ path: Path.join(__dirname, ".env")})
const PORT = process.env.PORT

if(!PORT){
    throw new ReferenceError("PORT is not defined")
}
console.log(PORT);

const app = express()
const AuthMiddleware = require('./middlewares/auth')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(CookieParser())
app.use(AuthMiddleware)

// Settings
app.listen(PORT)
app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname, "views"))

app.use(express.static(Path.join(__dirname, "public")))

// Routes
const RoutesPath = Path.join(__dirname, "routes");

Fs.readdir(RoutesPath, (err, files)=> {
    if(err) throw new Error(err)
    files.forEach(route => {
        const RoutePath = Path.join(__dirname, "routes", route)
        const Routes = require(RoutePath);
        if(Routes.path && Routes.router) app.use(Routes.path, Routes.router)
    })
})