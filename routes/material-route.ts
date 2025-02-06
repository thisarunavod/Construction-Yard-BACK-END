import express from "express";
import {materialAdd, materialDelete, materialUpdate} from "../database/material-data-store";
import RawMaterial from "../model/RawMaterial";
import {create} from "node:domain";

const router = express.Router()

const materialList = [
    {code:'MR001' ,name: 'Cement' },
    {code:'MR002' ,name: 'Sand' },
    {code:'MR003' ,name: 'Reinforcement' },
    {code:'MR004' ,name: 'Aggregate' },

]

router.get('/testMaterial',async (req, res)=>{
    res.json(materialList)
})

router.post('/addMaterial' , async(req, res)=>{

    const newMaterial:RawMaterial = req.body
    console.log(req.body)
    try{
        const addedMaterial = await materialAdd(newMaterial)
        res.status(201).send()
    }catch (err) {
        console.log('Error adding material -> ',err)
        res.status(400).send('error adding Material')
    }

})

router.put('/updateMaterial/:material_id',async (req, res)=>{
    const material_id = req.params.material_id
    const updateMaterial:RawMaterial = req.body

    try{
        const updatedMaterial = await materialUpdate(material_id , updateMaterial)
        res.json(updatedMaterial)
    }catch (err){
        console.log('Error Updating material -> ',err)
    }
})

router.delete('/deleteMaterial/:material_id',async (req, res)=>{
    const material_id = req.params.material_id
    try{
        const deletedMaterial = materialDelete(material_id);
        res.send('Material Deleted Successfully !!')
    }catch (err) {
        console.log('Error delete Material !!')
    }
})

export default router