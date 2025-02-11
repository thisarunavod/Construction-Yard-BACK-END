import {PrismaClient} from "@prisma/client";
import RawMaterial from "../model/RawMaterial";
import MaterialReceivedDetails from "../model/MaterialReceivedDetails";

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
        return newRawMaterial
    }catch (err){
        throw err
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
        return updatedMaterial
    }catch (err){
        console.log('Error Updated Material -->',err)
    }

}

export async function materialDelete(id:string){
    try {
        return await prisma.rawMaterial.delete({
            where: {material_id: id}
        })
    }catch (err){
        throw err
    }
}

export async function getMaterial(id:string){
    try {
            return await  prisma.rawMaterial.findUnique(
                {where:{material_id:id}}
            )
    }catch (err){
        throw err
    }
}
export async function getAllMaterial(){
    try {
        return await  prisma.rawMaterial.findMany()
    }catch (err){
        throw err
    }
}

export async function addMaterialReceivedDetails(details:MaterialReceivedDetails){

    const receivedDate = new Date(details.received_date)
    const relevantMaterial:RawMaterial|null = await getMaterial(details.m_id);
    let qtyAvailable: number = 0;
    relevantMaterial ? qtyAvailable=(relevantMaterial.qty_available+details.received_qty):qtyAvailable



    try{
        const addedMaterialReceivedDetails = await prisma.$transaction(async(tx)=>{

            //  firstly add material quantity
            await tx.rawMaterial.update({
                where:{material_id:details.m_id},
                data:{
                    qty_available:qtyAvailable
                }
            })

            // secondly update MaterialReceivedDetails
            const receivedDetail = await tx.materialReceiveDetail.create({
                data:{
                    received_id:details.received_id,
                    sup_id:details.sup_id,
                    m_id:details.m_id,
                    material_name:details.material_name,
                    type:details.type,
                    received_qty:details.received_qty,
                    unit:details.unit,
                    received_date:receivedDate.toISOString()
                }
            })
            return receivedDetail
        })
    }catch (err){
        throw err
    }
}