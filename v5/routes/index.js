var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
     res.render("landing.ejs");
});
//AUTH routes

router.get("/register",function(req,res){
   res.render("register");
});

router.post("/register",function(req,res){
   var newUser = new User({username:req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           console.log(err);
           req.flash("error",err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Movieflix " + user.username);
            res.redirect("/movies");
       });
   });
});

//Login form
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",
    {
      successRedirect:"/movies",
      failureRedirect:"/login"
    }), function(req,res){
    res.send("logging u ");
});
//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Succesfully Logged out!!");
    res.redirect("/");
});

function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
        return next();
     }
     res.redirect("/login");
}

module.exports = router;