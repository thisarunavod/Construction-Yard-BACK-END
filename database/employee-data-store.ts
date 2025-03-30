import {PrismaClient} from "@prisma/client";
import Employee from "../model/Employee";

const prisma = new PrismaClient()


export async function addEmployee(e:Employee){
    try {
        const addedEmployee = await prisma.employee.create({
            data:{
                e_id:e.e_id,
                e_name:e.e_name,
                e_address:e.e_address,
                job_title:e.job_title,
                availability:e.availability
            }
        })
        return addedEmployee
    }catch (err){
        throw err
    }
}
export async function updateEmployee(id:string , e:Employee){
    try {
        const updateEmployer = await prisma.employee.update({
            where:{e_id:id},
            data:{
                e_name:e.e_name,
                e_address:e.e_address,
                job_title:e.job_title,
                availability:e.availability
            }
        })
        return updateEmployer
    }catch (err){
        throw err
    }

}
export async function deleteEmployee(id:string){
    try {
         return await prisma.employee.delete({ where:{e_id:id}})
    }catch (err){
        throw err
    }
}
export  async function getEmployee(id:string){
    try {
        return await prisma.employee.findUnique({
            where:{e_id:id}
        })
    }catch (err){
        throw err
    }
}
export async function getAllEmployee(){
    try {
        return await prisma.employee.findMany()
    }catch (err){
        throw err
    }
}

export async function getAllDrivers(){
    try {
        return await prisma.employee.findMany({
            where:{job_title:"DRIVER"}
        })
    }catch (err){
        throw err
    }
}