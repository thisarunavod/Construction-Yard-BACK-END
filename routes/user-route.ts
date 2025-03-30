import express from "express";
import Supplier from "../model/Supplier";
import {addSupplier} from "../database/supplier-data-store";
import {deleteUser, getAllUsers} from "../database/user-data-store";

const router = express.Router()

router.delete('/deleteUser/:id',async (req, res)=>{
    const id = req.params.id
    console.log(req.params.id)
    try {
        await deleteUser(id);
        res.status(200).json(id);
    } catch (err) {
        res.status(400).json(err); // Send JSON error response
    }
})

router.get('/getAllUsers',async (req, res)=>{

    try {
        const userList = await getAllUsers();
        res.status(200).json(userList);
    } catch (err) {
        res.status(400).json(err); // Send JSON error response
    }
})

export default router
