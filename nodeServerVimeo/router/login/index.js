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
    var msg;
    var errMsg = req.flash('error') //에러 메시지는 flash로 넘어온다
    if(errMsg) msg = errMsg;
	res.render('login.ejs', {'message': msg});
})

//passport.serialize
passport.serializeUser(function(user, done) {   //strategy성공시 실행
    console.log('passport session save : ', user.id)
    done(null, user.id);// user.id가 req.session.passport.user에 저장
  });

passport.deserializeUser(function(id, done){
    //session에서 id 뽑아서 전달해준다
    console.log('passport session get id : ', id)
    done(null, id)
})

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },function(req, email, password, done){
        //인증 처리
        var query = connection.query('select * from user where email=?',[email],function(err,rows) {
            if(err) return done(err);   //error있으면 err있다고 보냄
            if(rows.length){            //이미 email이 DB에 있으면 중복 방지
                return done(null, {'email': email, 'id': rows[0].id})
            }else{
                    return done(null, false, {'message': 'your login info is not found'})
            }
        })
    }
));

//이 콜백은 리다이렉트 기반으로 하는거라 json응답을 주어야한다. 
// router.post('/',passport.authenticate('local-join', {
//     //원래는 callback함수 자리지만, object literal로 표현해도 콜백함수처럼 동작
//     successRedirect: '/main',   //성공
//     failureRedirect: '/join',   //사용자 이미 있다
//     failureFlash: true })
// )

router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) res.status(500).json(err);
      if (!user) return res.status(401).json(info.message);
      //정상적인 경우 req.logIn하면 session저장하고 잘한다.
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json(user);
      });
    })(req, res, next);
  })

module.exports = router;