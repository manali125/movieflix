var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Movieflix = require("./models/movieflix");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds.js");



mongoose.connect("mongodb://localhost/movieflix");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//Passport Configuration
app.use(require("express-session")({
  secret: "ONce again Rusty wins cute dog contest",
  resave: false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.get("/",function(req,res){
     res.render("landing.ejs");
});

app.get("/movies",function(req,res){
    //get all movies from db
      Movieflix.find({},function(err,allMovies){
           if(err){
              console.log(err);
           }else{
           	   res.render("movies/index.ejs",{movies:allMovies,currentUser:req.user});
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
  res.render("movies/new.ejs");
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
                	res.render("movies/show.ejs",{movie:foundMovie});
                  }
     });
   
 
   
});

//=====COMMENTS ROUTE=========

app.get("/movies/:id/comments/new",isLoggedIn,function(req,res){
	   //find the movie with particular id
        Movieflix.findById(req.params.id,function(err,movie){
             if(err){
               console.log(err);
             }else{
                 res.render("comments/new.ejs",{movie:movie});
             }
        });
       
});

app.post("/movies/:id/comments",isLoggedIn,function(req,res){
	    Movieflix.findById(req.params.id,function(err,movie){
           if(err){
              console.log(err);
              res.redirect("/movies");
           }else{
              Comment.create(req.body.comment,function(err,comment){
                   if(err){
                      console.log(err);
                   }else{
                       movie.comments.push(comment);
                       movie.save();
                       res.redirect("/movies/" + movie._id);
                   }
              });
           }
	    });

});

//AUTH routes

app.get("/register",function(req,res){
   res.render("register");
});

app.post("/register",function(req,res){
   var newUser = new User({username:req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
            res.redirect("/movies");
       });
   });
});

//Login form
app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",
    {
      successRedirect:"/movies",
      failureRedirect:"/login"
    }), function(req,res){
    res.send("logging u ");
});
//logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
        return next();
     }
     res.redirect("/login");
}
app.listen(8080,function() {
	console.log("Movieflix running at 8080");
});