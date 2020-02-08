const sequelize = require('../util/database');
const NewsEvent = require('../model/newsevent');
const dotenv = require('dotenv').config();


exports.newsevent = async (req, res) => {

   const news = await NewsEvent.findAll({ where: { eventtype: 'news' } });
   const events = await NewsEvent.findAll({ where: { eventtype: 'events' } });
   res.render('home/newsevent',{news, events});
}

exports.postnewsevents = async (req, res) => {
   console.log(req.body);
   const type = req.body.type;
   const title = req.body.title;
   const eventdate = req.body.eventdate;
   const descrption = req.body.descrption;
   const details = req.body.details;

   const jsObj = {title: title, desc: descrption, extradetails: details, eventdate: eventdate, eventtype: type};

   try {
      const newsevent = await NewsEvent.create(jsObj);
      console.log(newsevent.dataValues)
      res.send(200);
   } catch (error) {
      console.log(error)
      res.send(400)
   }
}

exports.deleteEvent = async (req, res) => {
   const eventID = req.params.eventID;
   console.log(eventID)
   try {
      await NewsEvent.destroy({where: {id: eventID}});
      res.send(200);
   } catch (error) {
      console.log(error)
      res.send(400)
   }
}

exports.editEvent =async (req, res) => {
   const eventID = req.params.eventID;
   console.log(eventID);
   try {
      const data = await NewsEvent.findByPk(eventID);
      console.log(data.dataValues);
      res.render('home/newseventEdit',{data: data.dataValues});
   } catch (error) {
      console.log(error)
      res.send(400)      
   }
}

exports.editEventPost = async (req, res) => {
   console.log(req.body);
   const event_id = req.body.event_id;
   const title = req.body.title;
   const description = req.body.description;
   const extradetails = req.body.extradetails;

   try {
      await NewsEvent.update({title: title, desc: description, extradetails: extradetails},{ where: {id: event_id}});
      res.send(200);
   } catch (error) {
      console.log(error)
      res.send(400)        
   }
}