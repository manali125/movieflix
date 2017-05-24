var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Movieflix = require("./models/movieflix");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds.js");

var commentRoutes = require("./routes/comments"),
    movieRoutes   = require("./routes/movies"),
    indexRoutes   = require("./routes/index");

mongoose.connect("mongodb://localhost/movieflix");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB();

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

app.use("/",indexRoutes);
app.use("/movies/:id/comments",commentRoutes);
app.use("/movies",movieRoutes);

app.listen(8080,function() {
	console.log("Movieflix running at 8080");
});