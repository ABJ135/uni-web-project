const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")
const auth = require('../controller/auth')

router.post('/createAdmin',userController.createAdmin)

router.post('/createUser',auth,userController.createUser)

router.get('/login',userController.login)

router.get('/showUsers',auth,userController.showUsers)

router.delete('/deleteUser',auth,userController.deleteUser)

router.put('/updateUser',auth,userController.updateUser)

module.exports = router