const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
         x = 'team'
    }else{
         x = 'register'
    }
    res.render(x, {
        title: (req.user)? "Team Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/team'
    })
})

module.exports = {
    path: '/team', 
    router: router
}