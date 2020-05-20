var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

//접속정보 
const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "chrin^^1015",
    port: 3306,
	database: "USER"
});

//connection관련 객체 정보
connection.connect();

app.listen(3000, function() {
	console.log("start; express server on port 3000");
});

//public아래 파일은 static으로 기억한다
app.use(express.static('public'));
app.use(bodyParser.json())  //bodypoarser쓴다. json형태의 데이터 응답
app.use(bodyParser.urlencoded({extended:true}));  //json이외의 응답
app.set('view engine','ejs') //view engine은 ejs를 쓴다고 명시

//url routing
app.get('/', function(req, res){
	console.log('test');
	res.sendFile(__dirname + "/public/main.html") //file을 보내준다
})

app.get('/main', function(req, res){
	res.sendFile(__dirname + "/public/main.html") 
})

app.post('/email_post', function(req, res){
	//get : req.param('email')
	console.log(req.body.email)
	//res.send("<h1>welcome " +req.body.email+ " !</h1>")
	res.render('email.ejs', {'email' : req.body.email})
})

app.post('/ajax_send_email', function(req, res){
	//email정보가 있다면 json반환
	var email = req.body.email;
	var responseData = {};

	var query = connection.query('select name from user where email="'+email+'"', function(err, rows){
		if(err) throw err;
		if(rows[0]){
			console.log(rows[0].name)
			responseData.result = "ok";
			responseData.name = rows[0].name;
		}else{
			responseData.result = "none";
			responseData.name = "";
		}
		res.json(responseData)
	})
})