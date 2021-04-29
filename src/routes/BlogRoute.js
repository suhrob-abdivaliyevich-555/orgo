const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'blog'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "Blog": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/blog'
    })
})

module.exports = {
    path: '/blog', 
    router: router
}