var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Movieflix = require("./models/movieflix");
var seedDB = require("./seeds.js");

seedDB();

mongoose.connect("mongodb://localhost/movieflix");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",function(req,res){
     res.render("landing.ejs");
});

app.get("/movies",function(req,res){
    //get all movies from db
      Movieflix.find({},function(err,allMovies){
           if(err){
              console.log(err);
           }else{
           	   res.render("index.ejs",{movies:allMovies});
           }
      });
     
});

app.post("/movies",function(req,res){
	//get form data and add to movies page
	var title = req.body.title;
	var year = req.body.year;
	var rated = req.body.rated;
	var released = req.body.released;
	var runtime = req.body.runtime;
	var genre = req.body.genre;
	var director = req.body.director;
	var writer = req.body.writer;
	var actors = req.body.actors;
	var plot = req.body.plot;
	var language = req.body.language;
	var country = req.body.country;
	var awards = req.body.awards;
	var poster = req.body.poster;
	var metaScore = req.body.metaScore;
	var imdbRating = req.body.imdbRating;
	var imdbVotes = req.body.imdbVotes;
	var imdbId = req.body.imdbId;
	var type = req.body.type;
	var newMovie = {title:title,year:year,rated:rated,released:released,runtime:runtime,genre:genre,
		director:director,writer:writer,actors:actors,plot:plot,language:language,country:country,
		awards:awards,poster:poster,metaScore:metaScore,imdbRating:imdbRating,imdbVotes:imdbVotes,
		imdbId:imdbId,type:type};
	//movies.push(newMovie);
	//create a new movie and save it to db
	Movieflix.create(newMovie,function(err,newlyCreated){
           if(err){
              console.log(err);
           }else{
           	   res.redirect("/movies");
               //newlyCreated.push(newMovie);
           }

	});
	//redirect to movies page
    
});

app.get("/movies/new",function(req,res){
  res.render("new.ejs");
});

//Shows more info about the movie
app.get("/movies/:id",function(req,res){
   //find the movie with particular id
     Movieflix.findById(req.params.id).populate("comments").exec(function(err,foundMovie){
                  if(err){
                       console.log(err);
                  }else{
                  	console.log(foundMovie);
                  	//render the show page
                	res.render("show.ejs",{movie:foundMovie});
                  }
     });
   
 
   
});

app.listen(8080,function() {
	console.log("Movieflix running at 8080");
});