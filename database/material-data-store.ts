import {PrismaClient} from "@prisma/client";
import RawMaterial from "../model/RawMaterial";
import MaterialReceivedDetails from "../model/MaterialReceivedDetails";
import MaterialSendDetails from "../model/materialSendDetails";
import {getRequirement} from "./project-data-store";
import {MaterialRequirement} from "../model/MaterialRequirement";

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

export async function getMaterialReceivedDetails(id:string){
    try {
        return await  prisma.materialReceiveDetail.findUnique(
            {where:{received_id:id}}
        )
    }catch (err){
        throw err
    }
}

export async function getMaterialSendDetails(id:string){
    try {
        return await  prisma.materialSendDetail.findUnique(
            {where:{issue_id:id}}
        )
    }catch (err){
        throw err
    }
}
export async function getAllMaterialSendDetails(){
    try {
        return await prisma.materialSendDetail.findMany()
    }catch (err){
        throw err
    }
}
export async function getAllMaterialReceivedDetails(){
    try {
        return await  prisma.materialReceiveDetail.findMany()
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
        })

        return await getMaterialReceivedDetails(details.received_id)

    }catch (err){
        throw err
    }
}

export async function addMaterialSendDetails(details:MaterialSendDetails){

    const issuedDate = new Date(details.issue_date)
    const relevantMaterial:RawMaterial|null = await getMaterial(details.m_id);
    let qtyAvailable: number = 0;
    relevantMaterial ? qtyAvailable=(relevantMaterial.qty_available-details.issue_qty):qtyAvailable

    const relevantRequirement = await getRequirement(details)
    let issueQty = 0
    relevantRequirement ?  issueQty = (relevantRequirement.issue_qty + details.issue_qty):issueQty

    try{
        const addedMaterialisendDetails = await prisma.$transaction(async(tx)=>{

            // firstly change material quantity
            await tx.rawMaterial.update({
                where:{material_id:details.m_id},
                data:{
                    qty_available:qtyAvailable
                }
            })

            // secondly change project material requirement
            await tx.projectMaterialRequirements.updateMany({
                where:{
                    project_no:details.project_no,
                    m_id:details.m_id
                },
                data:{
                    issue_qty:issueQty
                }
            })

            // update MaterialSendDetails
            const receivedDetail = await tx.materialSendDetail.create({
                data:{
                    issue_id:details.issue_id,
                    m_id:details.m_id,
                    project_no:details.project_no,
                    issue_qty:details.issue_qty,
                    v_id:details.v_id,
                    issue_date:issuedDate.toISOString()
                }
            })
        })

        return await getMaterialSendDetails(details.issue_id)

    }catch (err){
        throw err
    }
}