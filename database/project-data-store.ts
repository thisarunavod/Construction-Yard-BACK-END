import {PrismaClient} from "@prisma/client";
import Project from "../model/Project";

const prisma = new PrismaClient()


export async function addProject (p:Project){
    const startDate = new Date(p.start_date!)
    const completionDate = new Date(p.completion_date!)

    try {
        const project = await prisma.project.create({
            data:{
                project_no:p.project_no,
                project_name:p.project_name,
                location:p.location,
                start_date:startDate.toISOString(),
                completion_date:completionDate.toISOString(),
            }
        })
        return project
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
