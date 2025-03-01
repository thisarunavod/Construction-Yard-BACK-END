import {PrismaClient} from "@prisma/client";
import Project from "../model/Project";
import {getMaterialReceivedDetails} from "./material-data-store";
import ProjectDetails from "../model/projectDetails";
import {MaterialRequirement} from "../model/MaterialRequirement";
import {json} from "node:stream/consumers";

const prisma = new PrismaClient()


export async function addProject (newProject:ProjectDetails){
    const startDate = new Date(newProject.start_date)
    const completionDate = new Date(newProject.completion_date)
    console.log(newProject)

    try{
        const addedProject = await prisma.$transaction(async(tx)=>{
            //  firstly add Project
            const project = await tx.project.create({
                data:{
                    project_no:newProject.project_no,
                    project_name:newProject.project_name,
                    location:newProject.location,
                    start_date:startDate.toISOString(),
                    completion_date:completionDate.toISOString(),
                }
            })

            // secondly Add Material requirements
            await Promise.all(
                newProject.requirements.map(async (requirement) => {
                    await tx.projectMaterialRequirements.create({
                        data: {
                            project_no: newProject.project_no,
                            project_name: newProject.project_name,
                            m_id: requirement.material_id,
                            issue_qty: requirement.issue_qty,
                            required_qty: requirement.required_qty,
                            unit: requirement.unit,
                        },
                    });
                })
            );
        })

        return await getProject(newProject.project_no)

    }catch (err){
        console.log(err)
        throw err
    }
}

export async function updateProject (pNo:string , p:Project){
    const startDate = new Date(p.start_date!)
    const completionDate = new Date(p.completion_date!)
    try {
        return await prisma.project.update({
            where:{project_no:pNo},
            data:{
                project_name:p.project_name,
                location:p.location,
                start_date:startDate.toISOString(),
                completion_date:completionDate.toISOString()
            }
        })
    }catch (err){
        throw err
    }
}
export async function deleteProject (pNo:string){
    try {
        await prisma.project.delete({where:{project_no:pNo}})
    }catch (err){
        throw err
    }
}
export async function getProject (pNo:string){
    try {
        return await prisma.project.findUnique({
            where: {project_no: pNo}
        })
    }catch (err){
        throw err
    }
}
export async function getAllProject (){
    try {
        return await prisma.project.findMany()
    }catch (err){
        throw err
    }
}
export async function getAllProjectMaterialRequirements (){
    try {
        return await prisma.projectMaterialRequirements.findMany()
    }catch (err){
        throw err
    }
}


