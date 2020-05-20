var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var main = require('./router/main')
var email = require('./router/email')


app.listen(3000, function() {
	console.log("start; express server on port 3000");
});

//public아래 파일은 static으로 기억한다
app.use(express.static('public'));
app.use(bodyParser.json())  //bodypoarser쓴다. json형태의 데이터 응답
app.use(bodyParser.urlencoded({extended:true}));  //json이외의 응답
app.set('view engine','ejs') //view engine은 ejs를 쓴다고 명시

//새로운 router정의
app.use('/main', main)	//main으로 들어오면 main.js로 처리 넘김
app.use('/email', email)

//url routing
app.get('/', function(req, res){
	console.log('test');
	res.sendFile(__dirname + "/public/main.html") //file을 보내준다
})
