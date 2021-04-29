const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'error-404'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "Error 404 Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/error-404'
    })
})

module.exports = {
    path: '/error-404', 
    router: router
}