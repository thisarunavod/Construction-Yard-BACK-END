import express from 'express'
import materialRoute from "./routes/material-route";

const app = express()

app.use(express.json())

app.use('/',(req, res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
    next();
})


app.get('/test',(req, res)=>{
    res.json('tested successfully !!')
})

app.use('/material',materialRoute)

app.listen(3000,()=>{
    console.log('app server is running successfully !!')
})