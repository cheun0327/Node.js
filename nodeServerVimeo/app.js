var express = require('express')
var app = express()
var bodyParser = require('body-parser')

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