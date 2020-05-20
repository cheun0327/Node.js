var express = require('express')
var app = express()
var router = express.Router();  //router method 실행
var path = require('path'); //상대경로
var mysql = require('mysql')

//DATABASE SETTING
const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "chrin^^1015",
    port: 3306,
	database: "USER"
});

//connection관련 객체 정보
connection.connect();

//router!
router.post('/form', function(req, res){
	//get : req.param('email')
	console.log(req.body.email)
	//res.send("<h1>welcome " +req.body.email+ " !</h1>")
	res.render('email.ejs', {'email' : req.body.email})
})

router.post('/ajax', function(req, res){
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

module.exports = router;