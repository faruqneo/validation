
const Pdf = require('../model/pdf');
const sequelize = require('../util/database');
const fs = require('fs');
const AWS = require('aws-sdk');
const dotenv = require('dotenv').config();


exports.pdfData = (req, res) => {
   //console.log(req.body)
   //console.log(req.file)
   const name = req.body.name;
   const email = req.body.email;
   const slip = req.body.slip;
   const fileName = req.file.path;
   let path = "";
   

   const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

      fs.readFile(fileName, (err, data) => {
         if (err) throw err;
         const params = {
             Bucket: 'masalaryslip', 
             Key: req.file.filename, 
             Body: data
         };
         s3.upload(params, function(s3Err, data) {
             if (s3Err) throw s3Err
            // console.log(`File uploaded successfully at ${data.Location}`);
            path = data.Location;
            console.log(path)
             res.send('ok')
         });
      });

   //res.send(200);
}