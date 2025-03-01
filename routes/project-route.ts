import express from "express";
import {
    addProject,
    deleteProject,
    getAllProject,
    getAllProjectMaterialRequirements,
    getProject,
    updateProject
} from "../database/project-data-store";
import Project from "../model/Project";
import ProjectDetails from "../model/projectDetails";
import {MaterialRequirement} from "../model/MaterialRequirement";

const router = express.Router()


router.post('/addProject',async (req, res)=>{
    const newProjectDetails:ProjectDetails = req.body
    try {
        const addedProject = await addProject(newProjectDetails)
        res.status(201).json(addedProject);
    }catch (err){
        res.status(500).json(err)
    }

})

router.put('/updateProject/:pNo',async (req, res)=>{
    const pNo = req.params.pNo
    const updatingProject = req.body
    try {
        const updatedProject:Project = await updateProject(pNo,updatingProject)
        updatedProject != null ? res.status(204).json(updatedProject):res.status(404).send()
    }catch (err){
        res.status(500).json(err)
    }
})

router.delete('/deleteProject/:pNo',async (req, res)=>{
    const pNo = req.params.pNo
    try {
        await deleteProject(pNo)
        res.status(204).send()
    }catch (err){
        res.status(404).json()
    }
})

router.get('/getProject/:pNo',async (req, res)=>{
    const pNo:string = req.params.pNo
    try{
        const project:Project|null = await getProject(pNo)
        project != null ? res.json(project):res.status(404).send()
    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/getAllProject',async (req, res)=>{
    try{
        const projectList:Project[] = await getAllProject()
        projectList != null ? res.json(projectList):res.status(404).send()
    }catch (err){
        res.status(500).json()
    }
})

router.get('/getAllProjectMaterialRequirements',async (req, res)=>{
    try{
        const allRequirements= await getAllProjectMaterialRequirements()
        allRequirements != null ? res.json(allRequirements):res.status(404).send()
    }catch (err){
        res.status(500).json()
    }
})



export default router;