import express, { Application } from 'express'
import cors from 'cors'
import { userRoute } from './app/modules/user/user.route'


const app:Application=express()

//middleware
app.use(express.json())
app.use(cors())
// user Route
app.use('/',userRoute)
app.get('/',async(req,res)=>{
       res.send("hello") 
})
export default app