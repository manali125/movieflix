var express = require("express");
var router = express.Router();
var Movieflix = require("../models/movieflix");
var middleware = require("../middleware");


router.get("/",function(req,res){
    //get all movies from db
      Movieflix.find({},function(err,allMovies){
           if(err){
              console.log(err);
           }else{
           	   res.render("movies/index.ejs",{movies:allMovies,currentUser:req.user});
           }
      });
     
});

router.post("/",middleware.isLoggedIn,function(req,res){
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
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newMovie = {title:title,year:year,rated:rated,released:released,runtime:runtime,genre:genre,
		director:director,writer:writer,actors:actors,plot:plot,language:language,country:country,
		awards:awards,poster:poster,metaScore:metaScore,imdbRating:imdbRating,imdbVotes:imdbVotes,
		imdbId:imdbId,type:type,author:author};
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

router.get("/new",middleware.isLoggedIn,function(req,res){
  res.render("movies/new.ejs");
});

//Shows more info about the movie
router.get("/:id",function(req,res){
   //find the movie with particular id
     Movieflix.findById(req.params.id).populate("comments").exec(function(err,foundMovie){
                  if(err){
                       console.log(err);
                  }else{
                  	console.log(foundMovie);
                  	//render the show page
                	res.render("movies/show.ejs",{movie:foundMovie});
                  }
     });
   
});
//Edit movies
router.get("/:id/edit",middleware.checkMovieOwnership,function(req,res){
  //is user logged in
  
      Movieflix.findById(req.params.id,function(err,foundMovie){
           res.render("movies/edit",{movie:foundMovie});
    });
});


//update movies
router.put("/:id",middleware.checkMovieOwnership,function(req,res){
   //find and update movie
   Movieflix.findByIdAndUpdate(req.params.id,req.body.movie,function(err,updateMovie){
          if(err){
                res.redirect("/back");
          }else{
                res.redirect("/movies/"); 
          }
   });
   //redirect to show page
});

//delete
router.delete("/:id",middleware.checkMovieOwnership,function(req,res){
   Movieflix.findByIdAndRemove(req.params.id,function(err){
        if(err){
          res.redirect("back");
        }else{
          res.redirect("/movies/" + req.params.id);
        }
   });
});

module.exports = router;
