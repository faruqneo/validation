const sequelize = require('../util/database');
const fs = require('fs');
const AWS = require('aws-sdk');
const Pdf = require('../model/pdf');
const dotenv = require('dotenv').config();

exports.user =async (req, res) => {
   let userId = req.params.userId;
   try {
      let employee = await sequelize.query(`SELECT * FROM userLogin WHERE id = ${userId}  ORDER BY id`, { type: sequelize.QueryTypes.SELECT});
      //console.log(employee)
      res.render('home/slip', {
         employee,
         success: false
      })
   } catch (error) {
      console.log(error)
   }
}

exports.upload = (req, res) => {
   const userId = req.body.id;
   const name = req.body.name;
   const email = req.body.email;
   const fileName = req.file.path;
   const current = req.body.date;
   //console.log(fileName);

   const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

      fs.readFile(fileName, (err, data) => {
         if (err) throw err;
         const params = {
             Bucket: 'masalaryslip', 
             Key: fileName,  //req.file.filename
             Body: data
         };
         s3.upload(params, function(s3Err, data) {
             if (s3Err) throw s3Err;
            // console.log(`File uploaded successfully at ${data.Location}`);
            const slipDetails = {
               userId: userId,
               name: name,
               email: email,
               slipLocation: data.Location,
               monthDate: current
            };
            Pdf
            .create(slipDetails)
            .then(pdf => {
               //console.log("ok")
               //res.redirect(`/user/${userId}`);
               res.render('home/slip', {
                  home: true,
                  support: false,
                  employee: false,
                  success: "Slip uploaded"
               });
            })
            .catch(err => console.log(err));
         });
      });
}


exports.slip =async (req, res) => {
   try {
      let userId = req.params.userId;
      let slip = await sequelize.query(`SELECT * FROM pdfs WHERE userId = ${userId} ORDER BY monthDate DESC LIMIT 1`, { type: sequelize.QueryTypes.SELECT});
      //console.log(slip)
      let slipObj = {
         userId: slip[0].userId,
         name: slip[0].name,
         email: slip[0].email,
         slipLocation: slip[0].slipLocation,
         monthDate: slip[0].monthDate,
      }
      res.status(200).json(slipObj);
   } catch (error) {
      res.status(404).json({msg: "No slips are there"});
   }
}


exports.slipAll =async (req, res) => {
   try {
      let userId = req.params.userId;
      let slip = await sequelize.query(`SELECT * FROM pdfs WHERE userId = ${userId}`, { type: sequelize.QueryTypes.SELECT});
      console.log(slip)

      let slipData = [];

      for(let i in slip)
         slipData.push({"slipLocation": slip[i].slipLocation, "monthDate": slip[i].monthDate})
      
      console.log(slipData);

      let slipObj = {
         userId: slip[0].userId,
         name: slip[0].name,
         email: slip[0].email,
         data: slipData
      }
         // slipLocation: slip[0].slipLocation,
         // monthDate: slip[0].monthDate,
      res.status(200).json(slipObj);
   } catch (error) {
      res.status(200).json({msg: "No slips are there"});
   }
}