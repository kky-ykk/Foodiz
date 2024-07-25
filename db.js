
const mongoose=require('mongoose');

const url=process.env.MONGODB_URL;

const mongoDB=async()=>{
    await mongoose.connect(url,{useNewUrlParser:true},async(err,result)=>{
        if(err) console.log("---",err);
        else{
            console.log("connected");
            const fetched_data=await mongoose.connection.db.collection("fooditems");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory=await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){

                    if(err) console.log(err);
                    else{
                        global.foodData=data;
                        global.foodCategory=catData;
                    } 
                })
            })
        }
    });
}


module.exports=mongoDB;

