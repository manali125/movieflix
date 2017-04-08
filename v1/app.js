var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Movieflix = require("./models/movieflix");

mongoose.connect("mongodb://localhost/movieflix");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



// Movieflix.create(
// {
//     "title": "The Dark Knight",
//     "year": 2008,
//     "rated": "PG-13",
//     "released": "2008-07-18",
//     "runtime": "152 min",
//     "genre": "Action, Crime, Drama",
//     "director": "Christopher Nolan",
//     "writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
//     "actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
//     "plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
//     "language": "English, Mandarin",
//     "country": "USA, UK",
//     "awards": "Won 2 Oscars. Another 141 wins & 126 nominations.",
//     "poster": "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
//     "metaScore": 82,
//     "imdbRating": 9.0,
//     "imdbVotes": 1564829,
//     "imdbId": "tt0468569",
//     "type": "movie"
//   },function(err,movie){
//       if (err) {
//       	console.log(err);
//       }else{
//       	console.log("movie added: ");
//       	console.log(movie);
//       }        
//   });

app.get("/",function(req,res){
     res.render("landing.ejs");
});

app.get("/movies",function(req,res){
    //get all movies from db
      Movieflix.find({},function(err,allMovies){
           if(err){
              console.log(err);
           }else{
           	   res.render("movies.ejs",{movies:allMovies});
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

app.get("/movies/:id",function(req,res){
    res.send("This will be the showpage");
});

app.listen(8080,function() {
	console.log("Movieflix running at 8080");
});