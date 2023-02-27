const mongoose=require('mongoose');
const URI="mongodb://localhost:27017/inNotebook";

const connectMongo=()=>{
    mongoose.connect(URI,()=>{
        console.log("Connected to Mongo");
    });
}
module.exports=connectMongo; 