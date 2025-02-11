import express from "express";
import {
    addSupplier,
    deleteSupplier,
    getAllSupplier,
    getSupplier,
    updateSupplier
} from "../database/supplier-data-store";
import Supplier from "../model/Supplier";
import e from "express";

const router = express.Router()

router.get('/testSupplier',async (req, res)=>{
    res.send('Supplier tested')
})

router.post('/addSupplier',async (req, res)=>{

    const addingSupplier:Supplier = req.body
    try {
        const newSupplier = await addSupplier(addingSupplier);
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(400).json(err); // Send JSON error response
    }
})

router.put('/updateSupplier/:id',async (req, res)=>{
    const id = req.params.id
    const updatingSupplier =  req.body
    console.log(updatingSupplier)
    try {
        const updatedSupplier:Supplier  = await updateSupplier(updatingSupplier,id)
        if ( updatedSupplier ){
            res.status(200).json(updatedSupplier)
        }else {
            res.status(404).send()
        }
    }catch (err){
        res.status(500).json(err)
    }
})
router.delete('/deleteSupplier/:id',async (req, res)=>{
    const id = req.params.id
    try {
        await deleteSupplier(id)
        res.status(200).send()
    }catch (err){
        res.status(404).json(err)
    }
})
router.get('/getSupplier/:id', async (req, res)=>{
    const id = req.params.id
    try{
        const relevantSupplier:Supplier|null = await getSupplier(id)
        relevantSupplier != null ? res.json(relevantSupplier): res.status(404).send()
    }catch (err){
        res.status(500)
    }
})
router.get('/getAllSuppliers', async (req, res)=>{
    try{
        const allSuppliers:Supplier[]|null = await getAllSupplier()
        allSuppliers != null ? res.json(allSuppliers): res.status(404).send()
    }catch (err){
        res.status(500)
    }
})
export default router