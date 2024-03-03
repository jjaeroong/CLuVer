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
const app = express();
const { authMiddleware } = require("./Middleware/auth");
const cors = require("cors");
const session = require("express-session");






  // 세션 사용
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// 라우트 등록


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

  

app.get('/board/post', (req, res) => {
  res.render('post');
});

// app.use(authMiddleware);

app.get('/login', (req, res) => {

  res.render('login2');
})
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


app.get('/mypage/writelist', (req, res) => {
  
  res.render('mypage-writelists');
})
app.post('/', (req, res) => {
  console.log(req.body)
  scheduleRouter

})
app.get('/schedule', (req, res) => {
  scheduleRouter
})

app.use("/", loginRouter); 
app.use("/mainpage", scheduleRouter); 


app.use("/posts", postRouter);

app.use('/',subclubuserRouter)
app.use("/subclub",SubClublistROuter)

app.listen(3000, async () => {
  console.log("3000번 서버 가동");
  await sequelize.authenticate();
  console.log("db authenticate");
});
