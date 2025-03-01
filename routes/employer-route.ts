import express from "express";
import Employee from "../model/Employee";
import {
    addEmployee,
    deleteEmployee, getAllDrivers,
    getAllEmployee,
    getEmployee,
    updateEmployee
} from "../database/employee-data-store";


const router = express.Router()

router.post('/addEmployee',async (req, res)=>{
    const addingEmployer:Employee = req.body
    try {
        const newEmployer = await addEmployee(addingEmployer)
        res.status(201).send(newEmployer)
    }catch (err){
        res.status(400).json(err)
    }


})
router.put('/updateEmployee/:id',async (req, res)=>{
    const id = req.params.id
    const updatingEmployee = req.body
    try {
        const updatedEmployer = await updateEmployee(id,updatingEmployee);
        updatedEmployer ? res.status(200).json(updatedEmployer):res.status(404).send()
    }catch (err){
        res.status(500).send()
    }
})
router.delete('/deleteEmployee/:id',async (req, res)=>{
    const id = req.params.id
    try {
        await deleteEmployee(id)
        res.status(200).json(id)
    }catch (err){
        res.status(404).send()
    }
})
router.get('/getEmployee/:id',async (req, res)=>{
    const id = req.params.id
    try {
        const employer = await  getEmployee(id)
        employer != null ? res.json(employer):res.status(404).send()
    }catch (err){
        res.status(500).send()
    }

})

router.get('/getAllDrivers',async (req, res)=>{
    try {
        const allDrivers= await getAllDrivers()
        allDrivers != null ? res.json(allDrivers):res.status(404).send()

    }catch (err){
        res.status(400).send(err)
    }
})

router.get('/getAllEmployees',async (req, res)=>{
    try {
        const allEmployees= await getAllEmployee()
        allEmployees != null ? res.json(allEmployees):res.status(404).send()
    }catch (err){
        res.status(400).send(err)
    }
})

export default router;