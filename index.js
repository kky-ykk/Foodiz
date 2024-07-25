const express = require('express')
const path = require('path');

const cors=require("cors");


const app = express()
require('dotenv').config();


app.use(cors());

app.use(express.json());



const fetch=require("./db");
fetch();

// app.get('/', (req, res) => {
//   res.send('Food DeliveryApp!')
// });

const routesUser=require("./routes/UserRoutes");
const foodDatas=require("./routes/displayDatas");

app.use("/api",routesUser);
app.use("/api",foodDatas);


app.use(express.static(path.join(__dirname,'client/dist')));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,'client/dist/index.html')))

const PORT=process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});