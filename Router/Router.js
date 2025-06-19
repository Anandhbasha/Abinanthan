import express from 'express'
import { deleteData, InserData, readData, updateData } from '../Controller/Controller.js'

const route = express.Router()

route.get('/',readData)
route.post('/',InserData)
route.put('/:name',updateData)
route.delete('/:name',deleteData)

export default route