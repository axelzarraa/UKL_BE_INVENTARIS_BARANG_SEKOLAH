import express from 'express'
import{
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} from '../controller/user_controller.js'

import { authenticate, authorize } from '../controller/auth_controller.js'
import { IsAdmin } from '../middleware/role.validation.js'

const app = express()
app.use(express.json())

app.get('/', getAllUser)
app.get('/userId/:id',getUserById)
app.post('/addUser',addUser)
app.put('/upUser/:id',authorize,[IsAdmin],updateUser)
app.delete('/delUser/:id',authorize,[IsAdmin],deleteUser)

export default app
