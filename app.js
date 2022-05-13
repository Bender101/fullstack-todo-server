const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const todoRouter = require('./src/routes/todo.router');
const authRouter = require('./src/routes/auth.router');

require('dotenv').config();


const app = express();
const { COOKIE_SECRET, COOKIE_NAME } = process.env;


app.set('cookieName', COOKIE_NAME);


app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(
  session({
    name: app.get('cookieName'),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400, 
    },
  }),
);

app.use('/todos', todoRouter);
app.use('/auth', authRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Start server to PORT = ${PORT}`))
