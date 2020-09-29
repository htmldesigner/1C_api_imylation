const {Router} = require('express')
const router = Router()
const path = require('path')
const fs = require('fs')
const Users = require('../model/users')

router.post('/add_user', async (req, res) => {

    const checkIIN = await Users.checkUserByIIN(req.body.iin)

    if(checkIIN){
        res.json({error: 'already exixt'})
        res.end()
    }else{
        const user = new Users(req.body.name, req.body.phone, req.body.iin)
        await user.save()
        res.status()
    }

})

router.get('/', async (req, res) => {
    const users = await Users.getAll()
    res.json(users)
})

module.exports = router