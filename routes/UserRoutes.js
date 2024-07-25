const express=require("express");
const router=express.Router();
const User=require("../models/user");
const Order = require('../models/Orders')
const {body,validationResult}=require('express-validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/createuser",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const data={
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            location:req.body.location
        }
        // console.log(data);

        //creating hash password
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(data.password,salt);
        data.password=hashPassword;

        await User.create(data);

        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error!"});
    }
});

router.post("/login",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        let success=false;
        const data={
            password:req.body.password,
            email:req.body.email
        }
        // console.log(data);
        const user=await User.findOne({email:data.email});
        if(!user){
            return res.status(404).json({message:"invalid email id",success});
        }

        const compareRes=await bcrypt.compare(data.password,user.password);

        if(!compareRes)
            return res.status(404).json({message:"invalid password",success});

        success=true;
        
        const payload={
            user:{
                id:user.id
            }
        };

        const token= jwt.sign(payload,"123");

        res.status(200).json({data,token:token,success});
    }catch(err){
        console.log(err);
        json.status(500).json({message:"internal server error!"});
    }
});

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    // console.log(eId);
    if (eId===null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
});

router.post('/myorderData',async (req,res)=>{
    try{
        let myData=await Order.findOne({'email':req.body.email});
        res.json({orderData:myData});
    }catch(err){
        res.send("server error!",err.message);
    }
})


module.exports=router;
