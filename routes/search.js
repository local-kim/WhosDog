const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const { PythonShell } = require("python-shell");

const Lost = require('../models/losts');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/public/Images/Search/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({ storage: storage }).single("img");

router.post('/', upload, async (req, res, err) => {
  const input_path = `client/public/Images/Search/${req.file.filename}`; // image 경로 만들기
  let options = {
    scriptPath: "./",
    args: [input_path]
  };
  
  await PythonShell.run("new_get_similar_imgs.py", options,(err, data) => {
    if (err) throw err;
    let file = data[0].split(',');
    let result=[];
    
    Promise.all(file.map(async (fileName, idx) => {
      await Lost.findOne({
        where:{
          file_name: fileName,
        }
      }).then((data) => {
        if(data!==null) result=[...result, data]
      })
    })).then(() => {
        return res.status(200).json({
        success:true, resultList:result 
      })
    })
  });
});

module.exports = router;

