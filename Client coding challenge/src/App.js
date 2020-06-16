import React from 'react';
import './App.css';
import Movie from './Movie';
import MovieForm from './MovieForm';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      movies: []
    }
  }
  
  getAllMovies = function() {
      let url = "http://localhost:8080/api/movies"
      let settings = {
        method: "GET",
        headers: {
          "session-exam-token" : "success-token"
        }
      }

      fetch(url, settings)
      .then(response => {
        if(response.ok) {
          return response.json()
        }
      }).then(responseJson => {
          console.log(responseJson)
          this.setState({movies: responseJson})
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  componentDidMount(){
    this.getAllMovies();
  }

  render(){
    return (
      <div>
        <MovieForm onSubmit = {this.getAllMovies} movies = {this.movies}/>
        <div class = "movieContainer">
          {this.state.movies.map((movie) => {
            return (
              <Movie title = {movie.title}
              year = {movie.year}
              rating = {movie.rating}
              id = {movie.id}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
