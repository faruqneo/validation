const sequelize = require('../util/database');
const Vacation = require('../model/vacation');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport(
   sendgridTransport({
     auth: {
       api_key: process.env.SENDGRID_API_KEY
     }
   })
 );

exports.apply = async(req, res) => {
try {
   const userId = req.body.userId;
   // const userName = req.body.userName;
   // const email = req.body.email;
   const startedAt = req.body.startedAt;
   const endedAt = req.body.endedAt;
   const noOfDays = req.body.noOfDays;
   const reason = req.body.reason;

   const user = await sequelize.query(`SELECT * FROM userLogin WHERE id = ${userId}`, { type: sequelize.QueryTypes.SELECT});
   //console.log(user[0]);

   const vacation = await Vacation.create({
      userId: user[0].id,
      userName: user[0].userId,
      email: user[0].email,
      startedAt: startedAt,
      endedAt: endedAt,
      noOfDays: noOfDays,
      reason: reason,
      status: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
   });
   
   res.json({msg: vacation});

} catch (error) {
   console.log(error);
   res.status(500).send(error);
}
}

exports.list = async(req, res) => {
   try {
      const vacation = await Vacation.findAll({order:[['id', 'DESC']]});
      res.render('home/vacationList', {vacation});
   } catch (error) {
      console.log(error)
   }
}

exports.vacation = async(req, res) => {
   const vacationId = req.params.vacationId;
   //console.log(vacationId);
   try {
      const vacation = await Vacation.findByPk(vacationId);
      //console.log(vacation.dataValues)
      res.render('home/vacationView', {vacation});
   } catch (error) {
      console.log(error)
   }
}

exports.response = async(req, res) => {
   const id = req.body.id;
   const response = req.body.response;
   let status = 0;
   const to_email = 'anisha@marmeto.com ';
   const subject = "Leave Application Response";
   //let body = "";
   let mailObj = {};
   
   try {
      //console.log(id, response)
     const vacation = await Vacation.findByPk(id);

      if(response === "approve")
      {
         status = 1;
         mailObj = {to: vacation.email, from: `Anisha Singh <${to_email}>`, subject: subject, html: `<p>Hi ${vacation.userName},</p><p>Your leave application for  "${vacation.reason}" has been approved.</p>`};
      }

      else if(response === "reject")
      {
         status = 2;
         mailObj = {to: vacation.email, from: `Anisha Singh <${to_email}>`, subject: subject, html: `<p>Hi ${vacation.userName},</p><p>Your leave application for  "${vacation.reason}" has been rejected.</p>`};
      }


      //console.log(status)
      await Vacation.update({
         status: status,
         updatedAt: Date.now()
      },{where: {id: id}});
      
      await transporter.sendMail(mailObj);

      res.send("ok")

   } catch (error) {
      console.log(error);
   }
}