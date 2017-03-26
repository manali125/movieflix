var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var movies =[{title:"Star Wars",rating:4,description:"Lorem Ipsum Lorem Ipsum"},
             {title:"Beauty and the Beast",rating:5,description:"Lorem Ipsum Lorem Ipsum"},
             {title:"Fast and furious",rating:3,description:"Lorem Ipsum Lorem Ipsum"}
     ];



app.get("/",function(req,res){
     res.render("landing.ejs");
});

app.get("/movies",function(req,res){
     res.render("movies.ejs",{movies:movies});
});

app.post("/movies",function(req,res){
	//get form data and add to movies page
	var title = req.body.title;
	var rating = req.body.rating;
	var description = req.body.description;
	var newMovie = {title:title,rating:rating,description:description};
	movies.push(newMovie);
	//redirect to movies page
    res.redirect("/movies");
});

app.get("/movies/new",function(req,res){
  res.render("new.ejs");
});

app.listen(8080,function() {
	console.log("Movieflix running at 8080");
});