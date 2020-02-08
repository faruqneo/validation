

const sequelize = require('../util/database');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Support = require('../model/support');
const SupportHistory = require('../model/supportHistory');
const axios = require('axios');
const localStorage = require('localStorage');
const sessionstorage = require('sessionstorage');
const validatemailInput = require('../validation/mail');
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
);

exports.email =async (req, res) => {

   const user_id = req.body.user_id;
   const from_email = req.body.from;
   const subject = req.body.subject;
   const text = req.body.text;
   const to_email = 'anisha@marmeto.com ';
   

   const dataObj = { user_id: user_id, fromEmail: from_email, toEmail: to_email, subject: subject, message: text, status: 1 };
   const mailObj = {to: `Anisha Singh <${to_email}>`, from: from_email, subject: subject, html: `<p>${text}</p>`};

   try {
    
    
    const support =  await Support.create(dataObj);
    await SupportHistory.create({
      messageId: support.dataValues.id,
      from: from_email,
      to: to_email
    });
    await transporter.sendMail(mailObj);
    
    console.log(`sent email from ${from_email} to support`);
    console.log(support.dataValues)
    res.json(support);

   } catch (error) {
     console.log(error);
     res.status(500).send('something worng in data.');
   }
}


exports.start = async (req, res) => {

  try {
    const inbox = await sequelize.query(`SELECT * FROM supports WHERE toEmail = ${JSON.stringify(req.session.user.email)} ORDER BY createdAt`, { type: sequelize.QueryTypes.SELECT});
    const sent = await sequelize.query(`SELECT * FROM supports WHERE fromEmail = ${JSON.stringify(req.session.user.email)} ORDER BY createdAt`, { type: sequelize.QueryTypes.SELECT});
    // console.log("inbox",inbox)
    // console.log("sent", sent)
    res.render('home/support' , {
      users: req.session.user,
      inbox,
      sent
    });
  } catch (error) {
    console.log(error)
  }

}

exports.query = async(req, res) => {
try {
  const query = await sequelize.query(`SELECT * FROM supports WHERE fromEmail = '${req.params.emailId}'`, { type: sequelize.QueryTypes.SELECT});
  res.json({data: query});
} catch (error) {
  console.log(error);
  res.send(404).send(error)
}
}

exports.mail =async (req, res) => {

  const { errors, isValid } = validatemailInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(403).send(errors);
  }
  else
  {
    let user_id = req.body.user_id;
    let from_email = req.body.from;
    let to_email = req.body.to;
    let subject = req.body.subject;
    let text = req.body.text;
  
    let dataObj = { user_id: user_id, fromEmail: from_email, toEmail: to_email, subject: subject, message: text, status: 1 };
    let mailObj = {to: to_email, from: from_email, subject: subject, html: `<p>${text}</p>`};
  
    try {
     
    const support = await Support.create(dataObj);
     await SupportHistory.create({
      messageId: support.dataValues.id,
      from: from_email,
      to: to_email
    });
     await transporter.sendMail(mailObj);
     
     console.log(`sent email from ${from_email} to support`);
     //res.send(`sent email from ${from_email} to support`);
     res.redirect('/support');
  
    } catch (error) {
      console.log(error);
      res.status(500).send('something worng in data.');
    }
  }
}


exports.message = async (req, res) => {
  //console.log(req.params.emailId)
  const message = await sequelize.query(`SELECT * FROM supports WHERE id = ${req.params.emailId}`, { type: sequelize.QueryTypes.SELECT});
  //console.log(message)
  let replay = false;
  if(message.length > 0)
  {
    const reply = await sequelize.query(`SELECT * FROM supportHistories WHERE messageId = ${req.params.emailId}`, { type: sequelize.QueryTypes.SELECT});
    console.log(reply)
    replay = reply;
  }
  res.render('home/message.ejs', {
    message,
    reply: replay
  })

}

exports.reply = async (req, res) => {
  console.log(req.body.email, req.body.reply, req.body.from, req.body.to)
  const email = req.body.email;
  const reply = req.body.reply;
  const from = req.body.from;
  const to = req.body.to;
  console.log("reply")

  const replyObj = {messageId: email, conversation: reply, from: from, to: to};
  
  try
  {
    const emaillist = await Support.findByPk(email);
    //console.log(emaillist.dataValues)
    if( emaillist.dataValues.status === 3) res.send(401);
    //console.log("running")
    else
    {
    await Support.update({status: 2, updatedAt: Date.now()}, {where : {id: email}});
    await SupportHistory.create(replyObj);
    res.send('ok');
    }
  }
  catch(error)
  {
    console.log(error)
  }

}

exports.displayReply = async (req, res) => {
  const emailId = req.params.emailId;
  //console.log(emailId);
  try{
    const reply = await SupportHistory.findAll({where: {messageId: emailId}});
    //console.log(reply);
    let data = [];
    for(let obj of reply)
      {
        //console.log(obj.conversation+" "+obj.from);
        data.push({"from": obj.from, "to": obj.to, "message": obj.conversation, "Time": obj.updatedAt})
      }

    res.json(data);
  }
  catch(error)
  {
    res.send(404);
  }
}

// exports.emailReply = async (req, res) => {
//   const emailId = req.params.emailId;
//   //console.log(emailId);
//   try{
//     const email = await sequelize.query(`SELECT * FROM supports WHERE id = ${emailId}`, { type: sequelize.QueryTypes.SELECT});
//     console.log(email);
//     res.json(email);
//   }
//   catch(error)
//   {
//     res.send(404);
//   }
// }

exports.emailReplyPost = async (req, res) => {
  const emailId = req.params.emailId;
  const reply = req.body.reply;
  console.log(emailId);
  try{

    const emaillist = await Support.findByPk(emailId);
    

    if( emaillist.dataValues.status === 3) 
    {
      
      res.send(200,"Ticket is closed."); 
    }
    else
    {

      await Support.update({status: 2, updatedAt: Date.now()}, {where : {id: emailId}});

      //const email = await Support.findByPk(emailId)
      const from = emaillist.fromEmail;
      const to = emaillist.toEmail;

      const replyObj = {messageId: emailId, conversation: reply, from: from, to: to};
      console.log(replyObj)
      let data = await SupportHistory.create(replyObj);

      
      res.json(data);
    }
  }
  catch(error)
  {
    console.log(error)
    res.send(404);
  }
}

exports.ticket = async (req, res) => {
  let emailId = req.params.emailId || 0;
  console.log("emailId")
  console.log(emailId);



  try{
    const emaillist = await Support.findByPk(emailId);
    //console.log(emaillist.dataValues)
    if( emaillist.dataValues.status === 3) res.send(401);

    else
    {
      await Support.update({status: 3, updatedAt: Date.now()}, {where : {id: emailId}});
      res.send("ticket is closed.")
    }
  }
  catch(error)
  {
    res.send(404);
  }
}
