var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + "/www"));
app.get('/',function(req,res) {
	res.sendFile(__dirname + "/index.html");
});

app.listen(app.get('port'));