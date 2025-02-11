import {PrismaClient} from "@prisma/client";
import Supplier from "../model/Supplier";

const prisma = new PrismaClient()

export async function addSupplier(s:Supplier){
     try {
          const addedSupplier =  await prisma.supplier.create({
             data: {
                 sup_id: s.sup_id,
                 company_name: s.company_name,
                 company_email: s.company_email,
             }
         });
         return addedSupplier;
     }catch (err){
         throw err
     }
}

export async function updateSupplier(s:Supplier , id:string){
     try {
           return prisma.supplier.update({
                where:{ sup_id : id },
                data:{
                    company_name:s.company_name,
                    company_email:s.company_email
                }
           })
     }catch (err){
         throw err
     }
}


export async function deleteSupplier(id:string){
     try {
        return prisma.supplier.delete(
            {where:{sup_id:id}}
        )
     }catch (err){
        throw err
     }
}


export function getSupplier(id:string){
    try {
        return prisma.supplier.findUnique(
            { where: {sup_id:id}}
        )
    }catch (err) {
        throw err
    }
}

export function getAllSupplier(){
    try {
        return prisma.supplier.findMany()
    }catch (err) {
        throw err
    }
}


export async function checkSupIdExist(id:string){

}