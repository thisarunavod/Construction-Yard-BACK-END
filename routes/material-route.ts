import express from "express";
import {
    addMaterialReceivedDetails, addMaterialSendDetails,
    getAllMaterial, getAllMaterialReceivedDetails, getAllMaterialSendDetails,
    getMaterial,
    materialAdd,
    materialDelete,
    materialUpdate
} from "../database/material-data-store";
import RawMaterial from "../model/RawMaterial";
import {create} from "node:domain";
import e from "express";
import MaterialReceivedDetails from "../model/MaterialReceivedDetails";
import MaterialSendDetails from "../model/materialSendDetails";

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
        res.status(200).json(addedMaterial)
    }catch (err) {
        console.log('Error adding material -> ',err)
        res.status(400).send(err)
    }

})

router.put('/updateMaterial/:material_id',async (req, res)=>{
    const material_id = req.params.material_id
    const updateMaterial:RawMaterial = req.body

    try{
        const updatedMaterial = await materialUpdate(material_id , updateMaterial)
        updatedMaterial ? res.json(updatedMaterial):res.status(404).send()
    }catch (err){
        res.status(500).send()
    }
})

router.delete('/deleteMaterial/:material_id',async (req, res)=>{
    const material_id = req.params.material_id
    try{
        await materialDelete(material_id);
        res.status(200).json(material_id)
    }catch (err) {
        res.status(404).send()
    }
})


router.get('/getMaterial/:id',async (req,res)=>{
    const material_id = req.params.id
    try{
        const relevantMaterial:RawMaterial|null = await getMaterial(material_id);
        relevantMaterial ? res.json(relevantMaterial): res.status(404).send()
    }catch (err) {
        res.status(500).send()
    }
})

router.get('/getAllMaterial',async (req,res)=>{
    try{
        const allMaterials:RawMaterial[]|null = await getAllMaterial();
        allMaterials ? res.json(allMaterials): res.status(404).send()
    }catch (err) {
        res.status(500).send()
    }
})


router.post('/addMaterialReceivedDetails',async(req, res)=>{
    const addingMRDetails:MaterialReceivedDetails = req.body
    console.log(addingMRDetails.received_date)
    try {
        const details = await addMaterialReceivedDetails(addingMRDetails)
        res.status(200).json(details)
    }  catch (err){
        res.status(500).json(err)
    }
})


router.get('/getAllMaterialReceivedDetails',async(req, res)=>{
    try {
        const detailsList = await getAllMaterialReceivedDetails()
        res.status(200).json(detailsList)
    }  catch (err){
        res.status(500).json(err)
    }
})

router.post('/addMaterialSendDetails',async(req, res)=>{
    const addingMSDetails:MaterialSendDetails = req.body
    console.log(addingMSDetails)
    try {
        const sendDetails = await addMaterialSendDetails(addingMSDetails)
        res.status(200).json(sendDetails)
    }  catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/getAllMaterialSendDetails',async(req, res)=>{
    try {
        const detailsList = await getAllMaterialSendDetails()
        detailsList ? res.status(200).json(detailsList):res.status(404).json()
    }  catch (err){
        res.status(500).json(err)
    }
})




export default router