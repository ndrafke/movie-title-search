import React, {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';



export default function App(props) {
  // Second API call for more data using imdb ID:
  const [movies, setMovies] = useState([]);
  const [imdb, setImdb] = useState(props.movieId);

  // useEffect runs when new imdb ID is provided as prop.
  useEffect(() => {
    let mounted = true;
    const getMovies = async () => {
      let res = await axios.get(
        `https://www.omdbapi.com/?i=${props.movieId}&apikey=4079f89d&plot=full`);
        if(mounted){
        setMovies([res.data]|| []);
        setImdb("");
        console.log(movies);
        }
      };
      getMovies();

      return() => {
        mounted = false;
      }
  }, [imdb]);
 

  
 
    
  return (
    <div>
        {movies.map((movie) => (
      <div className="result m-2" key={movie}>
        <div className="d-flex flex-row align-items-end m-1">
        <img className= "poster" src={movie.Poster} alt="movie poster"></img>
          <div className="d-flex flex-column justify-content-center m-2">
          <h6>{movie.Title}  ({movie.Year})</h6>
          <p>Rated {movie.Rated}</p>
          <p>{movie.Genre} - {movie.Type}</p>
          <p>IMDb Rating: {movie.imdbRating} / 10</p>
          </div>
        </div>
        <div className="d-flex flex-column m-2">
        <p>Directed by {movie.Director}</p>
        <p>Written by {movie.Writer}</p>
        <p>Cast: {movie.Actors}</p>
        <p>{movie.Plot}</p>
        <p><a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">Go to IMDb page</a></p>
        </div>
        </div>
        ))}
        </div>
  );
    }


