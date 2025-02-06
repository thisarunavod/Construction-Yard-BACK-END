import {PrismaClient} from "@prisma/client";
import Supplier from "../model/Supplier";

const prisma = new PrismaClient()

export async function addSupplier(s:Supplier){

    try {
        return await prisma.supplier.create({
            data:{
                sup_id:s.sup_id,
                company_name:s.company_name,
                company_email:s.company_email,
            }
        })

    }catch (err) {
        console.log('Error adding Supplier !!')
    }
}

export async function updateSupplier(s:Supplier , id:string){
    try {

    }catch (err) {
        console.log('Error update Supplier ->' , err)
    }
}
