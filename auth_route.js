import express from 'express'

import {
    authenticate, authorize
} from '../controller/auth_controller.js'

const app = express()


app.post('/login', authenticate),
app.use('/access', authorize, (req, res) => {
    res.json({ message: "Access granted to " + req.user.username });
});




export default app