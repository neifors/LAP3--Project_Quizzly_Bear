const express = require('express');
const router = express.Router();
const controller = require("../controllers/users")


router.get('/', controller.getAll)
// router.get('/username/:username', controller.getByUsername)
// router.get('/id/:id',controller.getUserById)
// router.post('/register',controller.register)
// router.post('/login', controller.login)
// router.put("/update", controller.updateScore)
// router.delete("/delete", controller.deleteUser)


module.exports=router;

