const mongoose=require('mongoose');

const imageSchema=new mongoose.Schema({
    imageFile:{
        type:String
    },
    description:{
        type:String
    }
});

const imageModel=mongoose.model("ImageModel",imageSchema);

module.exports=imageModel;