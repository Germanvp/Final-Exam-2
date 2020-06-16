import React from 'react';

class MovieForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            movies: []
        }
        this.state.movies = props.movies;
    }

    addMovie = (event) => {
        // To reflect changes immediately.
        event.preventDefault()
        let title = event.currentTarget.title.value
        let year = event.currentTarget.year.value
        let rating = event.currentTarget.rating.value
        var errText = document.querySelector('.errorText')

        console.log(title, year, rating, errText)
        let url = "http://localhost:8080/api/add-movie"

        let data = {
            movie_title: title,
            movie_year: year,
            movie_rating: rating
        }

        let settings = {
            method: "POST",
            headers: {
                "session-exam-token" : "success-token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(url, settings)
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                console.log("A", event.currentTarget)
                errText.innerHTML = response.statusText
            }

        }).then(responseJson => {
            errText.innerHTML = ""
            console.log(responseJson)
            this.setState({movies: responseJson})
        })
        .catch(err => {
            errText.innerHTML = err
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h1 class = "errorText"></h1>
                <form id = "movieForm" class = "movieForm" onSubmit = {this.addMovie}>
                    <label htmlFor="title">Title: </label>
                    <input type = "text" id = "title" name ="title"/>
                    
                    <label htmlFor="year">Year: </label>
                    <input type = "text" id = "year" name ="year"/>
    
                    <label htmlFor="rating">Rating: </label>
                    <input type = "text" id = "rating" name ="rating"/>

                    <button type ="submit">Post movie</button>
                </form>
            </div>
        );
    }
}

// function MovieForm( props ){
//     return(
//         <div id = "movieForm">
//             <form>
//                 <label htmlFor="title">Title: </label>
//                 <input type = "text" id = "title" name ="title"/>
                
//                 <label htmlFor="year">Year: </label>
//                 <input type = "text" id = "year" name ="year"/>

//                 <label htmlFor="rating">Rating: </label>
//                 <input type = "text" id = "rating" name ="rating"/>
//             </form>
//         </div>
//     );
// }

export default MovieForm;