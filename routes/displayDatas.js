const express=require("express");
const router=express.Router();

router.post("/foodData",async(req,res)=>{
    
    try{
        const data=global.foodData;
        const foodCategory=global.foodCategory;
        // console.log("data:::",foodCategory);
        res.status(200).json([data,foodCategory]);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error!"});
    }
});

module.exports=router;
