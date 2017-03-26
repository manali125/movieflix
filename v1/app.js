var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("views/show");
});



app.listen(8080,function() {
	console.log("Movieflix running on port 8080");
});