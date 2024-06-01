var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser"); //user added

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resumeRouter = require('./routes/resume');

var author = require('./routes/auth');
const line = require('@line/bot-sdk');
const uuid = require('uuid');
require('dotenv').config();

var botExecutor = require('./model/feature/bot-event-executor');
var LineResponse = require('./model/output/line-response');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
var accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
var secret = process.env.LINE_CHANNEL_SECRET;

const config = {
  channelAccessToken: accessToken,
  channelSecret: secret
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: accessToken
});


app.post('/webhook', line.middleware(config), (req, res) => {
  //#swagger.ignore = true
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json()); //user added
// app.use(bodyParser.urlencoded({ extended: true })); //user added


// event handler
function handleEvent(event) {
  console.log(event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const action = botExecutor.onMessage(event.message.text);

  var response = new LineResponse(event.replyToken, action);
  return response.sendAction();
}

app.set('trust proxy', 1) // trust first proxy  //TODO here must be know
app.use(session({
  secret: 'secret_key',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}));


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI || "";
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function mongoConnect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch(e) {
    console.dir(e);
    await client.close();
  } finally {
    // await client.close();
  }
}
mongoConnect()

function generateUserId() {
  return uuid.v4();
}

app.use((req, res, next) => {
  
  console.log(req.session);
  req.mongoClient = mongoClient;
  var uuid = req.cookies.uuid;
  if (!uuid) {
    uuid = generateUserId();
    res.cookie('uuid', uuid);
  }
  req.userId = uuid;
  next();
});

app.use(author);
app.use('/resume', resumeRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听服务器关闭事件
process.on('SIGINT', () => {
  console.log('收到 SIGINT 信号，正在关闭服务器...');
  mongoClient.close();
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0); // 退出 Node.js 进程
  });
});

module.exports = app;
