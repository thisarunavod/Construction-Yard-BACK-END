import User from "../model/User";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser(user : User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const addedUser = await prisma.user.create({
        data: {
            user_id:user.id,
            user_name:user.username,
            password:hashedPassword,
            role:user.role
        },
    });
    console.log("User created:", addedUser);
}
export async function getAllUsers(){
    console.log('awaaaaaaaaaaa')
    const userList = await prisma.user.findMany({
        where:{role:'Admin'}
    })
    console.log(userList)
    return userList;
}

export async function deleteUser(id:string){
    try {
        await prisma.user.delete({
            where:{user_id:id}
        })
    }catch (err){
        throw err
    }
}



export async function verifyUserCredentials(verifyUser:{username:string,password:string}) {
    try {
        const user   = await prisma.user.findUnique({
            where: { user_name : verifyUser.username}
        });
        if (!user) { return null; }
        if (!await bcrypt.compare(verifyUser.password, user.password)){ return null}
        return user;

    }catch (err){
        throw err
    }
}
