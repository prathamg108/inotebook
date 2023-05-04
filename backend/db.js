const mongoose=require('mongoose');
const URI="mongodb+srv://prathamg108:1234567890@cluster1.bdwu4fs.mongodb.net/test";

const connectMongo=()=>{
    mongoose.connect(URI,()=>{
        console.log("Connected to Mongo");
    });
}
module.exports=connectMongo; 