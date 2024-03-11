const mongoose=require('mongoose');

const connect=async ()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_DB,{dbName:process.env.DB});
        console.log('Database Successfully connected!');
    }
    catch{
        console.log('Unable to connect mongodb!');
    }
}

module.exports=connect;