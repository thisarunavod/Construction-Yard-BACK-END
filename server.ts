import express from 'express'
import materialRoute from "./routes/material-route";

const app = express()


const itemList = [
    {id:1,name:'thisaru'},
    {id:2,name:'kasun'},
    {id:3,name:'tashen'},
    {id:4,name:'ashan'},
]
const item='thisaru'

app.get('/test',(req, res)=>{
    // console.log(req)
    res.json(itemList)
})
app.use('/material',materialRoute)

app.listen(3000,()=>{
    console.log('app server is running successfully !!')
})