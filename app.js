const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');

dotenv.config();
const authRouter = require('./routes/auth');
const searchRouter = require('./routes/search');
const postRouter = require('./routes/post');
const mapRouter = require('./routes/map');
const {sequelize} = require('./models');
const passportConfig = require('./passport');

const app = express();
app.set('port', process.env.PORT || 8002);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
sequelize.sync({force: false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });

passportConfig();

app.use(cors({ origin: 'http://localhost:3000/'})); 
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', pageRouter);
app.use('/api/auth', authRouter);
app.use('/api/search', searchRouter);
app.use('/api/post', postRouter);
app.use('/api/map', mapRouter)

app.use((req, res, next) =>{
    const error = new Error({message: '라우터가 없습니다.'});
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
   //res.status(err.status || 500).render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});