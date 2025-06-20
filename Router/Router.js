import express from 'express'
import { deleteData, insertData, loginUser, readData, registerUser, updateData, verifyToken } from '../Controller/Controller.js'

const route = express.Router()

route.get('/',verifyToken, readData)
route.post('/insert',insertData)
route.put('/:Mobile',updateData)
route.delete('/:name',deleteData)
route.post('/newUser',registerUser)
route.post('/loginUser',loginUser)

export default route