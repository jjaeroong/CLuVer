const express = require("express");
const { sequelize } = require("./models");

const bodyParser = require('body-parser');
const postRouter = require("./routes/post");
const loginRouter = require("./routes/login");
const SubClublistROuter = require("./routes/SubClublist");
// const authMiddleware = require("./middleware"); 이걸쓰게 되면 모든 과정에서 로그인검사를 하기에 문제발생함
const passport = require('passport');
const subclubuserRouter = require('./routes/subclubuser');
const scheduleRouter = require('./routes/schedule');
const signUpRouter = require("./routes/signup");
const clubRouter = require('./routes/club');
const app = express();
const cors = require("cors");
const session = require("express-session");
const Club = require('./models/club');
const Clubuser = require('./models/clubuser');


  // 세션 사용
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// 라우트 등록

app.use(bodyParser.json());
app.use(passport.initialize());

// 라우트 등록



app.set('port',process.env.PORT||3000);
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.static('assets',{
  setHeaders:(res,path,stat)=>{
    if(path.endsWith('.css')){
       res.setHeader('Content-Type','text/css')

    }
    if(path.endsWith('.js')){
      res.setHeader('Content-Type','application/javascript');
    }
  }
}));

sequelize.sync({force:false})
  .then(()=>{
    console.log('데이터베이스 연결 성공');

  })
  .catch((err)=>{
    console.error(err);
  });

app.use(
  cors({
    origin: [
      "http://127.0.0.1:3306",
      ],
      credentials: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

app.get('/login.ejs', (req, res) => {
  console.log("테스트 페이지!");
  res.render('login'); // Assuming "login.ejs" is in the views directory
});
app.use("/login", loginRouter);
app.get('/create-account', (req, res) => {
  console.log("테스트 페이지!");
  res.render('create-account'); // Assuming "create-account.ejs" is in the views directory
});
app.use("/create-account", signUpRouter);

function loginRequired(req, res, next) {
  // 미 로그인
  if (!req.user) {
      res.redirect('/login.ejs');
      return;
  }
  next();
}

app.get("/groupparticipantslists.ejs", loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render("groupparticipantslists", {}); // Assuming "groupmanagerslist.ejs" is in the views directory
});

app.get('/board/post', (req, res) => {
  res.render('post');
});

app.get('/user/clubs', loginRequired, async (req, res) => {
  try {
      const userId = req.user.user_id;
      // 사용자가 속한 모임을 데이터베이스에서 쿼리하여 가져오기
      const userClubs = await Club.findAll({
          include: [{
              model: Clubuser,
              where: { user_id: userId }
          }]
      });
      res.json(userClubs);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.use('/clubs', clubRouter);

app.use('/clubs/:clubId/members', clubRouter);


app.get('/', async (req, res) => {

  subclubuserRouter
 
});

app.get('/subclub', (req, res) => {
  user=req.user
  res.render('smallgrouplists');
})

app.get('/mainpage', (req, res) => {

  res.render('index');
})
app.get('/', (req, res) => {
 
  scheduleRouter

})
app.get('/schedule', (req, res) => {
  scheduleRouter
})

app.post('/', (req, res) => {
  console.log(req.body)
  scheduleRouter

})
app.use("/mainpage", scheduleRouter); 

app.use("/posts", postRouter);

app.use('/',subclubuserRouter)
app.use("/subclub",SubClublistROuter)

app.listen(3000, async () => {
  console.log("3000번 서버 가동");
  await sequelize.authenticate();
  console.log("db authenticate");
});
