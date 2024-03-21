const express=require('express');
const registerModel=require('../model/registerModel.js');
const router=express.Router();
const multer=require('multer');
const fs=require('fs');
const imageModel=require('../model/ImageModel.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Use the original file name with a timestamp as the new file name
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  

router.get('/getImages',async (req,res)=>{
    const images=await imageModel.find({});
    if(images)
    {
        res.send(images);
    }
    else
    {
        res.send("Not found data");
    }
});

router.post('/upload',upload.single('image'),async (req,res)=>{

        // Log form fields if needed
       const imagePath=req.file.path;
        
        // Check if file is uploaded
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        fs.readFile(imagePath, { encoding: 'base64' }, async (err, data) => {
            if (err) {
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            const create=new imageModel({imageFile:data,description:req.body.description});
            await create.save();

            if(create)
            // Send back the base64-encoded image data to the client
            res.status(200).json({ imageData: data });
            else
            {
                res.status(200).json({ err:"Not generated" });
            }
          });
});

module.exports=router;
