import express from 'express'
import{
    getAllBarang,
    getBarangById,
    addBarang,
    updateBarang,
    deleteBarang,
} from '../controller/barang_controller.js'

import { authenticate, authorize } from '../controller/auth_controller.js'
import { IsAdmin } from '../middleware/role.validation.js'

const app = express()
app.use(express.json())

app.get('/', getAllBarang)
app.get('/:id',getBarangById)
app.post('/addBarang',authorize,[IsAdmin],addBarang)
app.put('/upBarang/:id',authorize,[IsAdmin],updateBarang)
app.delete('/delBarang/:id',deleteBarang)

// app.post('/login', authenticate)

export default app
