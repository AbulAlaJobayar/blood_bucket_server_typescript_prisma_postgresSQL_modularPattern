import express, { Application } from 'express'
import cors from 'cors'

const app:Application=express()

//middleware
app.use(express.json())
app.use(cors())

app.get('/',async(req,res)=>{
       res.send("hello") 
})
export default app