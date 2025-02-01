import express from "express";

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



export default router