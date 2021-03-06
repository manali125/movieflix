var Movieflix = require("../models/movieflix");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req,res,next){
	 if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                   res.redirect("back");
                }else{
                  //check the id's
                  if(foundComment.author.id.equals(req.user._id)){
                    next();
                  }else{
                    res.redirect("back");
                  }
                  
                }
  });
  } else{
    res.redirect("back");
  }
}

middlewareObj.checkMovieOwnership = function(req,res,next){
    if(req.isAuthenticated()){
      Movieflix.findById(req.params.id,function(err,foundMovie){
                if(err){
                   res.redirect("back");
                }else{
                  //check the id's
                  if(foundMovie.author.id.equals(req.user._id)){
                    next();
                  }else{
                    res.redirect("back");
                  }
                  
                }
  });
  } else{
    res.redirect("back");
  }	
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
        return next();
     }
     res.redirect("/login");
}
module.exports = middlewareObj;