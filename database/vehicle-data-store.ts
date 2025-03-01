import {PrismaClient} from "@prisma/client";
import Vehicle from "../model/Vehicle";

const prisma = new PrismaClient()

export async function addVehicle(v:Vehicle){
    try {
        const addedVehicle = await prisma.vehicle.create({
            data:{
                v_id:v.v_id,
                v_name:v.v_name,
                e_id:v.e_id,
                root_status:v.root_status,
                driver_availability:v.driver_availability,
                remove_or_working:v.remove_or_working
            }
        })
        return addedVehicle
    }catch (err){
        throw err
    }
}
export async function updateVehicle(id:string , v:Vehicle){

    try {
        const updateVehicle = await prisma.vehicle.update({
            where:{ v_id:id},
            data:{
                v_name:v.v_name,
                e_id:v.e_id,
                root_status:v.root_status,
                driver_availability:v.driver_availability,
                remove_or_working:v.remove_or_working
            }
        })
        return updateVehicle
    }catch (err){
        throw err
    }

}
export async function deleteVehicle(id:string){
    try {
        await prisma.vehicle.delete({
            where:{v_id:id}
        })
    }catch (err){
        throw err
    }
}
export async function getVehicle(id:string){
    try {
        return prisma.vehicle.findUnique({where:{v_id:id}})
    }catch (err){
        throw err
    }

}
export async function getAllVehicle(){
    try {
        return await prisma.vehicle.findMany({
            where:{remove_or_working:"WORKING"}
        })
    }catch (err){ throw err}
}