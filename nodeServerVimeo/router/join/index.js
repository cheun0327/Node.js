var express = require('express')
var app = express()
var router = express.Router();  //router method 실행
var path = require('path'); //상대경로
var mysql = require('mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

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
router.get('/', function(req, res){
    console.log('get join url')
	res.render('join.ejs');
})

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },function(req, email, password, done){
        console.log('local-join callback called');
    }
));

//router.post('/', function(req, res){
//    var body = req.body;
//    var email = body.email;
//    var name = body.name;
//    var passwd = body.password;
//
//    var sql = {email : email, name : name, pw : passwd};
//
//    var query = connection.query('insert into user set ?', sql, function(err, rows) {
//        if(err){throw err;}
//        else res.render('welcome.ejs', {'name': name, 'id': rows.insertId})
//    })
//})


module.exports = router;