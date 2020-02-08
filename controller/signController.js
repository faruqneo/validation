
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const sequelize = require('../util/database');
const localStorage = require('localStorage');
const sessionstorage = require('sessionstorage');

// Load User model
const Singup = require('../model/signup');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.singup = (req, res) => {
  const jsonObj = req.body;
  const { errors, isValid } = validateRegisterInput(jsonObj);

  // Check Validation
  if (!isValid) {
    return res.status(403).send(errors);
  }

  Singup.findOne({ where: {email: jsonObj.email} }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      let avatar = gravatar.url(jsonObj.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = {
        name: jsonObj.name,
        email: jsonObj.email,
        avatar: avatar,
        password: jsonObj.password
      };
      //console.log(newUser)

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          Singup
            .create(newUser)
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
}

exports.singin = (req, res) => {
  //console.log(req.body)
  const jsonObj = req.body;
   const { errors, isValid } = validateLoginInput(jsonObj);

     // Check Validation
  if (!isValid) {
    console.log(errors)
   return res.status(404).json(errors);
 }
 const email = jsonObj.email;
 const password = jsonObj.password;
 

 Singup.findOne({ where: {email: email} }).then(user => {
   // Check for user
   if (!user) {
     errors.email = 'User not found';
     console.log(errors)
     return res.status(404).json(errors);
   }

   
   // Check Password
   bcrypt.compare(password, user.password).then(isMatch => {
     if (isMatch) {
       // User Matched
       req.session.isLoggedIn = true;
       req.session.user = user;
       return req.session.save(err => {
         console.log(err);
         res.redirect('/');
       });
     } else {
       errors.password = 'Password incorrect';
       return res.status(404).json(errors);
     }
   });
 });

}

// exports.user = (req, res) => {
//   //console.log(req.user)
//   res.json({
//     id: req.user.id,
//     name: req.user.name,
//     email: req.user.email,
//     avatar: req.user.avatar
//   });
// }

exports.dashboard = async (req, res) => {
  try {
    const employee = await sequelize.query("SELECT * FROM `userLogin` ORDER BY id", { type: sequelize.QueryTypes.SELECT});
    res.render('home/index',{
      user: req.session.user,
      employee
    });
  } catch (error) {
    console.log(error)
  }
}

exports.valid = (req, res, next) => {
  if(req.session.isLoggedIn)
  next();
  else
  res.render('error/error.ejs');
}

exports.logout = (req, res) => {
  // req.session.isLoggedIn = false;
  // return req.session.save(err => {
  //   console.log(err);
  //   res.redirect('/');
  // });
  req.session.destroy(err => {
    res.redirect('/');
  });
}