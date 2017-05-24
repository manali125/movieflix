var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var flash = require("connect-flash");
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

// mongoose.connect("mongodb://localhost/movieflix");
mongoose.connect("mongodb://manali:manali@ds153501.mlab.com:53501/movieflix");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//Passport Configuration
app.use(require("express-session")({
  secret: "This is a secret page",
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
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/",indexRoutes);
app.use("/movies/:id/comments",commentRoutes);
app.use("/movies",movieRoutes);

app.listen(8080,function() {
	console.log("Movieflix running at 8080");
});