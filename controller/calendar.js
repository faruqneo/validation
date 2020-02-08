const sequelize = require('../util/database');
const Calendar = require('../model/calendar');

exports.calendar = async(req, res) => {
try {
   const holiday = await sequelize.query("SELECT * FROM `calendar`", { type: sequelize.QueryTypes.SELECT});
   let leaveList = [];
   for(let i in holiday)
      leaveList.push(holiday[i])

   res.json({"data": leaveList});
} catch (error) {
   console.log(error);
   res.send(404).json({msg: "No data"})
}
}