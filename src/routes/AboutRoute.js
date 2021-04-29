const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'about'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "About Page": "Registration Page",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/about'
    })
})

module.exports = {
    path: '/about', 
    router: router
}