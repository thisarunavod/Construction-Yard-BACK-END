import {PrismaClient} from "@prisma/client";
import RawMaterial from "../model/RawMaterial";

const prisma = new PrismaClient();

export async function materialAdd(m:RawMaterial){

    try {
        const newRawMaterial = await prisma.rawMaterial.create({
            data:{
                material_id:m.material_id,
                material_name:m.material_name,
                type:m.type,
                qty_available:m.qty_available,
                unit:m.unit,
                // materialReceiveDetails:m.materialReceiveDetails
            }
        })
        console.log('Material Added -> ',newRawMaterial)
        return newRawMaterial
    }catch (err){
        console.log('Error adding material --> ',err)
    }
}

export async function materialUpdate( relevant_id:string, m:RawMaterial ){
    try{
        const updatedMaterial = await prisma.rawMaterial.update({
            where: { material_id:relevant_id},
            data:{
                material_name:m.material_name,
                type:m.type,
                qty_available:m.qty_available,
                unit:m.unit
            }
        })
        console.log(' Material Updated Successfully !! ',updatedMaterial)
        return updatedMaterial
    }catch (err){
        console.log('Error Updated Material -->',err)
    }

}

export async function materialDelete(id:string){
    try {
        const deletedMaterial = await prisma.rawMaterial.delete({
            where:{material_id:id}
        })
        console.log('Material Deleted !!',deletedMaterial)
        return deletedMaterial
    }catch (err){

    }
}
