import express from 'express'
import {
   getAllPeminjaman,
   getPeminjamanById,
   addPeminjaman,
   pengembalianBarang,
   getUsageAnalysis,
   analyzeItems
} from '../controller/transaksi_controller.js'

import { authenticate, authorize } from '../controller/auth_controller.js'
import { IsAdmin } from '../middleware/role.validation.js'

const app = express()


app.get('/borrow', getAllPeminjaman)
app.get('/borrow/:id', getPeminjamanById)
app.post('/borrow',authorize,[IsAdmin], addPeminjaman)
app.post('/return',authorize,[IsAdmin], pengembalianBarang)
app.post('/usage-report',authorize,[IsAdmin], getUsageAnalysis)
app.post('/borrow-analysis', authorize,[IsAdmin],analyzeItems)


export default app 