import express from "express";
import Vehicle from "../model/Vehicle";
import {addVehicle, deleteVehicle, getAllVehicle, getVehicle, updateVehicle} from "../database/vehicle-data-store";


const router = express.Router()

router.post('/addVehicle',async (req, res)=>{

    const addingVehicle:Vehicle = req.body
    try {
        const newVehicle = await addVehicle(addingVehicle)
        res.status(200).json(newVehicle);
    }catch (err){
        res.status(400).json(err); // Send JSON error response
    }
})
router.put('/updateVehicle/:v_id',async (req, res)=>{
    const vId = req.params.v_id
    const updatingVehicle = req.body
    try {
        const updatedVehicle:Vehicle = await updateVehicle(vId,updatingVehicle)
        updatedVehicle ? res.status(200).json(updatedVehicle):res.status(404).send()
    }catch (err){
        res.status(500).send()
    }
})
router.delete('/deleteVehicle/:v_id',async (req, res)=>{
    const vId = req.params.v_id
    try {
        await deleteVehicle(vId)
        res.status(200).json(vId)
    }catch (err){
        res.status(404).json(err)
    }

})
router.get('/getVehicle/:v_id',async (req, res)=>{
    const vId = req.params.v_id
    try {
        const relevantVehicle:Vehicle|null = await getVehicle(vId)
        relevantVehicle != null ? res.json(relevantVehicle): res.status(404).send()
    }catch (err){
        res.status(500).json(err)
    }
})
router.get('/getAllVehicle',async (req, res)=>{
    try {
        const  vehicleList:Vehicle[]|null = await getAllVehicle()
        vehicleList != null ? res.status(200).json(vehicleList):res.status(404).json("not found Vehicles")
    }catch (err){
        res.status(500).json(err)
    }
})

export default router