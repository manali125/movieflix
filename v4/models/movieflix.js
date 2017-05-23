var mongoose = require("mongoose");
//SCHEMA SETUP
var movieflixSchema = new mongoose.Schema({
	title:String,
	year:Number,
	rated:String,
	released:String,
	runtime:String,
	genre:String,
	director:String,
	writer:String,
	actors:String,
	plot:String,
	runtime:String,
	language:String,
	country:String,
	awards:String,
	poster:String,
	metaScore:Number,
	imdbRating:Number,
	imdbVotes:Number,
	imdbId:String,
	type:String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	},
	comments:[
        {
        	type: mongoose.Schema.Types.ObjectId,
        	ref:"Comment"
        }
	]

});

module.exports = mongoose.model("Movieflix",movieflixSchema); 