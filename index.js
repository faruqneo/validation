const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const support = require('./routes/support');
const signin = require('./routes/signin');
const home = require('./routes/home');
const newsevent = require('./routes/newsevent');
const calender = require('./routes/calendar');
const vacation = require('./routes/vacation');
const PORT = process.env.PORT || 3000;

const app = express();

const options = {
  host: process.env.MYSQL_HOST_NAME,
  port: 3306,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
};

const sessionStore = new MySQLStore(options);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'slips');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// multer setup
app.use(multer({storage: fileStorage}).single('file'));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(support);
app.use(signin);
app.use(home);
app.use(newsevent);
app.use(calender);
app.use(vacation);

let sequelize = require('./util/database')

sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database');
  });


app.get('/', (req, res) => {
  res.render('login/signin');
})

app.get('/signup', (req, res) => {
  res.render('login/signup');
})

// app.get('/test', (req, res) => {
//   res.render('home/message.ejs')
// })

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});