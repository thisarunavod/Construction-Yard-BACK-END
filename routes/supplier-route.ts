import express from "express";
import {addSupplier, updateSupplier} from "../database/supplier-data-store";
import Supplier from "../model/Supplier";

const router = express.Router()

router.get('/testSupplier',async (req, res)=>{
    res.send('Supplier tested')
})


router.post('/addSupplier',async (req, res)=>{
    const addingSupplier:Supplier = req.body
    try {
        const added_supplier = await addSupplier(addingSupplier)
        console.log(added_supplier)
        res.status(201).send()
    }catch (err){
        console.log('Error adding Supplier -> ',err)
    }
})
router.put('/updateSupplier/:id',async (req, res)=>{
    const id = req.params.id
    const updatingSupplier =  req.body
    try {
        const updated_supplier = await  updateSupplier(updatingSupplier,id)
        res.status(201).send
    }catch (err){

    }
})
router.delete('/deleteSupplier/:id',(req, res)=>{

})
router.get('/getSupplier/:id',(req, res)=>{

})
router.get('/getAllSupplier',(req, res)=>{

})
export default router