var fortune = require('./lib/fortune.js');

var express = require('express');

var app = express();

var handlebars = require('express3-handlebars')
	.create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port',process.env.PORT || 80);

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.render('home');
});

app.get('/about',function(req,res){
	res.render('about',{fortune:fortune.getFortune(), name:'Nirav'});
});

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on server port ' + app.get('port'));
});
