const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
const clubRouter = require('./routes/club');
const scheduleRouter = require('./routes/schedule');
const userRouter = require('./routes/user');
const { sequelize } = require("./models");
const passport = require('passport');
const Club = require('./models/club');
const Clubuser = require('./models/clubuser');

const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('assets', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

app.use(
    cors({
        origin: [
            "http://127.0.0.1:3306",
        ],
        credentials: true,
    })
);

app.use(
    session({
        secret: '1234',
        resave: false,
        saveUninitialized: true,
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

// Routes
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
app.get('/forgot-password.ejs', (req, res) => {
    console.log("테스트 페이지!");
    res.render('forgot-password'); // Assuming "forgot-password.ejs" is in the views directory
});


function loginRequired(req, res, next) {
  // 미 로그인
  if (!req.user) {
      res.redirect('/login.ejs');
      return;
  }
  next();
}

app.get("/groupmanage.ejs", loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render("groupmanage", {}); // Assuming "groupmanagerslist.ejs" is in the views directory
});

app.get("/groupparticipantslists.ejs", loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render("groupparticipantslists", {}); // Assuming "groupmanagerslist.ejs" is in the views directory
});

app.get("/groupmanagerslists.ejs", loginRequired, (req, res) => {
    console.log("테스트 페이지!");
    res.render("groupmanagerslists", {}); // Assuming "groupmanagerslist.ejs" is in the views directory
});

app.get("/groupsettings.ejs", loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render("groupsettings", {}); // Assuming "groupmanagerslist.ejs" is in the views directory
});
// Add other routes that require authentication here

// RESTful API routes
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

app.use('clubs/:clubId/members/:memberId/assign-leader', clubRouter);

// Assuming these routes are also protected
app.get('/board.ejs', loginRequired, (req, res) => {
    console.log("테스트 페이지!");
    res.render('board'); // Assuming "board.ejs" is in the views directory
});
app.get('/board_detail.ejs', loginRequired, (req, res) => {
    console.log("테스트 페이지!");
    res.render('board_detail'); // Assuming "board_detail.ejs" is in the views directory
});
app.get('/board_write.ejs', loginRequired, (req, res) => {
    console.log("테스트 페이지!");
    res.render('board_write'); // Assuming "board_write.ejs" is in the views directory
});
app.get('/index.ejs', loginRequired, (req, res) => {
    console.log("테스트 페이지!");
    res.render('index'); // Assuming "index.ejs" is in the views directory
});

app.use('/schedule', scheduleRouter);

app.get('/mypage-privacy.ejs', loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render('mypage-privacy'); // Assuming "index.ejs" is in the views directory
});

app.use('/user', userRouter);

app.get('/mypage-writelists.ejs', loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render('mypage-writelists'); // Assuming "index.ejs" is in the views directory
});

app.get('/smallgrouplists.ejs', loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render('smallgrouplists'); // Assuming "index.ejs" is in the views directory
});

app.get('/smallgroupsettings.ejs', loginRequired, (req, res) => {
  console.log("테스트 페이지!");
  res.render('smallgroupsettings'); // Assuming "index.ejs" is in the views directory
});

app.listen(3000, async () => {
    console.log("3000번 서버 가동");
    await sequelize.authenticate();
    console.log("db authenticate");
});
