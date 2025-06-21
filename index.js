import express from 'express'
import route from './Router/Router.js'
import Db from './Database/Db.js';
import cors from 'cors'
const app = express()
app.use(express.json())
const PORT = 6004;
app.use(cors({
    origin:"http://localhost:5174",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))
Db('mongodb://127.0.0.1:27017/Newone')
// app.get('/',)
app.use('/crud',route)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)    
})