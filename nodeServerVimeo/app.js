var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')


app.listen(3000, function() {
	console.log("start; express server on port 3000");
});

//public아래 파일은 static으로 기억한다
app.use(express.static('public'));
app.use(bodyParser.json())  //bodypoarser쓴다. json형태의 데이터 응답
app.use(bodyParser.urlencoded({extended:true}));  //json이외의 응답
app.set('view engine','ejs') //view engine은 ejs를 쓴다고 명시

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//새로운 router정의
app.use(router)	//path없을 때 router모듈쓸래!
