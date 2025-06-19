import express from 'express'
import route from './Router/Router.js'
import Db from './Database/Db.js';

const app = express()
const PORT = 6004;
Db('mongodb://127.0.0.1:27017/Newone')
// app.get('/',)
app.use('./crud',route)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)    
})