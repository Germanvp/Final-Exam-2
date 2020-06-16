const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* 
    Your code goes here 
*/
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

const movieModel = mongoose.model('moviedex', movieSchema)

const Movies = {
    addNewMovie: function(movie){
        return movieModel.create(movie)
        .then(movie => {
            return movie;
        })
        .catch(err => {
            return err;
        })
    },

    getAllMovies: function(){
        return movieModel.find()
        .then(movies => {
            return movies;
        })
        .catch(err => {
            return err;
        })
    }
}

module.exports = {
    Movies
};