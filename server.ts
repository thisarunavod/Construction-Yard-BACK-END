import express from 'express'
import materialRoute from "./routes/material-route";
import supplierRoute from "./routes/supplier-route";
import employerRoute from "./routes/employer-route";
import vehicleRoute from "./routes/vehicle-route";
import projectRoute from "./routes/project-route";
import authRoute, {authenticateToken} from "./routes/auth-route";
import dotenv from "dotenv";
import cors from 'cors';
import userRoute from "./routes/user-route";
dotenv.config();
const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
}));

app.use('/',(req, res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
    next();
})

app.use('/auth',authRoute)
app.use(authenticateToken)

app.get('/test',(req, res)=>{
    res.json('tested successfully !!')
})

app.use('/material',materialRoute)
app.use('/supplier',supplierRoute)
app.use('/employee',employerRoute)
app.use('/vehicle',vehicleRoute)
app.use('/project',projectRoute)
app.use('/user',userRoute)

app.listen(3000,()=>{
    console.log('app server is running successfully !!')
})