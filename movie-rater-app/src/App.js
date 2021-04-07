import React,{ useState, useEffect } from 'react';
import './App.css';
import MovieList from './component/movielist';
import MovieDetails from "./component/movie_details";
import MovieForm from "./component/movie_form";



function App() {

    const [movies, setMovie] = useState([]);
    const [selectedMovies, setSelectedMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/movie/",{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => resp.json())
            .then(resp => setMovie(resp))
            .then(error => console.log(error))
    }, []);

     const loadMovie = movie => {
        setSelectedMovie(movie);
        updateMovie(movie);
        setEditedMovie(null);
     };

    const editClicked = movie => {
        setEditedMovie(movie);
        setSelectedMovie(null)
    };

    const updateMovie = movie => {
        const newMovie = movies.map(mov => {
            if (mov.id === movie.id){
                return movie;
            }
            return mov;
        });
        setMovie(newMovie);
    };

    const newMov = ()=> {
        setEditedMovie({title:'', description:''});
        setSelectedMovie(null);
    };

    const createMovie = movie =>{
        const newMovie = [...movies, movie]

        setMovie(newMovie);
    };

    const removeClick = movie =>{
        const newMovie = movies.filter(mov =>mov.id !== movie.id);
        setMovie(newMovie)
    }

  return (
    <div className="App">
          <div className="layout">
              <div>
                <MovieList movies={movies}
                           movieClicked={loadMovie}
                           editClicked ={editClicked}
                            removeClicked={removeClick}/>
                    <br/>

              <button type="submit" onClick={newMov}>New Movie</button>
              </div>
              <MovieDetails movie={selectedMovies} UpdateDetails ={loadMovie}/>
              {editedMovie ?
              <MovieForm movie={editedMovie} updateMovie={updateMovie} CreateMovie={createMovie}/>
                  :null
              }
          </div>
    </div>
  );
}

export default App;
