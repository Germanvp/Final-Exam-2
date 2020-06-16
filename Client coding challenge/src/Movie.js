import React from 'react';

class Movie extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <div class = "movieBlock">
                <h1>{this.props.title}</h1>
                <h2>{this.props.year}</h2>
                <h2>{this.props.rating}</h2>
                <h3 class = "movieId" >{this.props.id}</h3>
            </div>
        );
    }
}

// function Movie( props ){
//     return(
//         <div>
//             <h1>{this.props.title}</h1>
//             <h2>{this.props.year}</h2>
//             <h2>{this.props.rating}</h2>
//         </div>
//     );
// }

export default Movie;