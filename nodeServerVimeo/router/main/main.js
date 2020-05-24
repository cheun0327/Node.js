//url routing folder
var express = require('express')
var app = express()
var router = express.Router();  //router method 실행
var path = require('path'); //상대경로

router.get('/', function(req, res){
    console.log('main.js loaded', req.user) //req.user로 deserialize에 있는 값을 접근
    var id = req.user;
    //res.sendFile(path.join(__dirname, "../public/main.html"));
    res.render('main.ejs', {'id' : id});
});

//외부 라이브러리 export, require할 수 있다.
//다른 파일에서 main.js를 모듈로 사용할 수 있다.
module.exports = router;