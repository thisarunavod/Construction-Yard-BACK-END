import express from 'express'
import materialRoute from "./routes/material-route";
import supplierRoute from "./routes/supplier-route";
import employerRoute from "./routes/employer-route";
import vehicleRoute from "./routes/vehicle-route";
import projectRoute from "./routes/project-route";

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
app.use('/supplier',supplierRoute)
app.use('/employee',employerRoute)
app.use('/vehicle',vehicleRoute)
app.use('/project',projectRoute)

app.listen(3000,()=>{
    console.log('app server is running successfully !!')
})