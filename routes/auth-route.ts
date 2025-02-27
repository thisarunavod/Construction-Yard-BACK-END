import express from "express";
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import {createUser, verifyUserCredentials} from "../database/user-data-store";
import User from "../model/User";

dotenv.config()
const router = express.Router()

router.post('/login',async (req, res) => {
    console.log('Login')
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    const user : {username:string , password:string} = {username, password};
    try{
        const isVerifiedUser =  await verifyUserCredentials(user);
        console.log()

        if(isVerifiedUser){
            const role  = isVerifiedUser.role
            const token = jwt.sign({username,role}, process.env.SECRET_KEY as Secret, {expiresIn: "250m"});
            const refreshToken = jwt.sign({ username,role }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"});
            res.json({accessToken : token, refreshToken : refreshToken});
        }else{
            res.status(403).send('Invalid credentials')
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})
router.post("/register", async (req, res) => {
    console.log('Register', req.body);
    const id = req.body.user.id;
    const username = req.body.user.username;
    const password = req.body.user.password;
    const role = req.body.user.role;

    const user : User = { id, username, password , role};
    try{
        const registration = await createUser(user);
        res.status(201).json(registration);
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }

})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token)res.status(401).send('No token provided');

    console.log(refresh_token)
    try{
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {username: string, role:string, iat: number};
        const token = jwt.sign({ username: payload.username,role:payload.role }, process.env.SECRET_KEY as Secret, {expiresIn: "250m"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})

export function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    // console.log(token);
    if(!token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {username: string, role:string, iat: number};
        // console.log(payload.username);
        req.body.username = payload.username;
        next();
    }catch(err){
        res.status(401).send(err);
    }
}


export default router