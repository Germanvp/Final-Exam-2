const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const uuid = require('uuid')
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const cors = require( './middleware/cors' );
const {Movies} = require('./models/moviedex-model')
const validateToken = require('./middleware/token-validation')

const app = express();

app.use( cors );
app.use(validateToken)
app.use(bodyParser.json())

/* 
    Your code goes here 
*/
app.post('/api/add-movie', (req, res) => {
    let movie_title = req.body.movie_title
    let movie_year = req.body.movie_year
    let movie_rating = req.body.movie_rating

    console.log(req.body)
    if (!movie_rating || !movie_year || !movie_title) {
        res.status(403)
        res.statusMessage = "You need to send all movie fields to add the movie to the movie list"
        res.send().end()
    }

    //Generate uuid
    let movie_id = uuid()
    console.log(movie_id)

    let newMovie = {
        title: movie_title,
        year: movie_year,
        rating: movie_rating,
        id: movie_id
    }

    Movies.addNewMovie(newMovie)
    .then(movie => {
        res.status(201)
        res.json(movie)
        res.send().end()
    })
    .catch(err => {
        res.status(400)
        res.send().end()
    })
    
})

app.get('/api/movies', (req, res) => {
    Movies.getAllMovies()
    .then(movies => {
        console.log(movies.length)
        if (!movies || movies.length == 0) {
            res.status(404)
            res.statusMessage = "No movies found in the moviedex"
            res.send().end()
        } else {
            res.status(200)
            res.json(movies)
            res.send().end()
        }
    })
    .catch(err => {
        res.status(400)
        res.send().end()
    })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});