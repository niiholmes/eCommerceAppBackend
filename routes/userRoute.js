const {Router} =require('express')
const router = Router()
const {createUser, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/userController')


//read===get
router.get('/api/user/find/:username', getUser)

//create===post
router.post('/api/user/new', createUser)



//read===get
router.get('/api/users/find' , getAllUsers)



//update===put
router.put('/api/user/update/:id', updateUser)

//delete===delete
router.delete('/api/user/delete/:id', deleteUser)


module.exports = router