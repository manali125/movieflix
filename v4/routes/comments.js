var express = require("express");
var router = express.Router({mergeParams:true});
var Movieflix = require("../models/movieflix");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=====COMMENTS ROUTE=========

router.get("/new",middleware.isLoggedIn,function(req,res){
	   //find the movie with particular id
        Movieflix.findById(req.params.id,function(err,movie){
             if(err){
               console.log(err);
             }else{
                 res.render("comments/new.ejs",{movie:movie});
             }
        });
       
});

router.post("/",middleware.isLoggedIn,function(req,res){
	    Movieflix.findById(req.params.id,function(err,movie){
           if(err){
              console.log(err);
              res.redirect("/movies");
           }else{
              Comment.create(req.body.comment,function(err,comment){
                   if(err){
                      console.log(err);
                   }else{
                       //add username and id
                       comment.author.id = req.user._id;
                       comment.author.username = req.user.username;
                       //save comment
                       comment.save();
                       movie.comments.push(comment);
                       movie.save();
                       res.redirect("/movies/" + movie._id);
                   }
              });
           }
	    });

});
//edit comment
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err){
        console.log(err);
      }else{
        res.render("comments/edit",{movie_id:req.params.id,comment:foundComment});
      }
  })
  
});
//update comment
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
      if(err){
         res.redirect("back");
      } else{
         res.redirect("/movies/" + req.params.id); 
      }
  });
})
//destroy comment
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
          res.redirect("back");
        }else{
          res.redirect("/movies/" + req.params.id);
        }
   });
});

module.exports = router;