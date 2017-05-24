var mongoose = require("mongoose");
var Movieflix = require("./models/movieflix");
var Comment = require("./models/comment");

var data = [
{
    "title": "Avengers: Age of Ultron",
    "year": 2015,
    "rated": "PG-13",
    "released": "2015-05-01",
    "runtime": "141 min",
    "genre": "Action, Adventure, Sci-Fi",
    "director": "Joss Whedon",
    "writer": "Joss Whedon, Stan Lee (Marvel comics), Jack Kirby (Marvel comics)",
    "actors": "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans",
    "plot": "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans.",
    "language": "English",
    "country": "USA",
    "awards": "1 win & 12 nominations.",
    "poster": "http://ia.media-imdb.com/images/M/MV5BMTU4MDU3NDQ5Ml5BMl5BanBnXkFtZTgwOTU5MDUxNTE@._V1_SX300.jpg",
    "metaScore": 66,
    "imdbRating": 7.6,
    "imdbVotes": 370909,
    "imdbId": "tt2395427",
    "type": "movie"
  },
  {
    "title": "The Avengers",
    "year": 2012,
    "rated": "PG-13",
    "released": "2012-05-04",
    "runtime": "143 min",
    "genre": "Action, Sci-Fi, Thriller",
    "director": "Joss Whedon",
    "writer": "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
    "actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
    "plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
    "language": "English, Russian",
    "country": "USA",
    "awards": "Nominated for 1 Oscar. Another 35 wins & 76 nominations.",
    "poster": "http://ia.media-imdb.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw@@._V1_SX300.jpg",
    "metaScore": 69,
    "imdbRating": 8.1,
    "imdbVotes": 920458,
    "imdbId": "tt0848228",
    "type": "movie"
  },
  {
    "title": "The Shawshank Redemption",
    "year": 1994,
    "rated": "R",
    "released": "1994-10-14",
    "runtime": "142 min",
    "genre": "Crime, Drama",
    "director": "Frank Darabont",
    "writer": "Stephen King (short story \"Rita Hayworth and Shawshank Redemption\"), Frank Darabont (screenplay)",
    "actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "language": "English",
    "country": "USA",
    "awards": "Nominated for 7 Oscars. Another 14 wins & 20 nominations.",
    "poster": "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg",
    "metaScore": 80,
    "imdbRating": 9.3,
    "imdbVotes": 1590699,
    "imdbId": "tt0111161",
    "type": "movie"
  }];

function seedDB(){
Movieflix.remove({},function(err){
		if(err){
  			console.log(err);
		}
		console.log("removed");
		
//add movies
data.forEach(function(seed){
        Movieflix.create(seed,function(err,data){
        if(err){
              console.log(err);
        }else{
              console.log("added new movie");
              //create comment
              Comment.create({
              	text:"A must watch movie!!",
              	author:"Homer"
              },function(err,comment){
              	  
                  if(err){
                       console.log(err);
                  }else{
                        data.comments.push(comment);
              	  		data.save();
              	  		console.log("created new comment");
                  }
              });
        }
     });
	});
});
//add comments
}

module.exports = seedDB;