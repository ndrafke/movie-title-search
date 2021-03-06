import React, {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';



export default function Results(props) {
  // Second API call for more data using imdb ID:
  const [movies, setMovies] = useState([]);
  const [imdb, setImdb] = useState(props.movieId);

  // useEffect runs when new imdb ID is provided as prop.
  useEffect(() => {
    let mounted = true;
    const getMovies = async () => {
      let res = await axios.get(
        `https://www.omdbapi.com/?i=${props.movieId}&apikey=${process.env.REACT_APP_API_KEY}`);
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
    <div className="card-group">
        {movies.map((movie) => (
      <div className="card m-1 p-2" key={movie} style={{width: "20rem", border: "1px solid black"}}>
       <div style={{maxHeight: "60vh", minHeight: "60vh", width: "100%", objectFit: "contain"}}>
        <img className= "card-img-top img-responsive mt-2" src={movie.Poster} alt="movie poster" style={{backgroundColor: "lightblue"}} />
        </div>
          <div className="card-body mt-2" style={{fontSize: "0.7rem", backgroundColor: "lightblue", minHeight: "25vh", maxHeight: "25vh"}}>
          <p className="card-title" style={{fontSize: "0.9rem", fontWeight: "bold"}}>{movie.Title}<br/>({movie.Year})</p>

          <p>Rated {movie.Rated}</p>
          <p>{movie.Genre} - {movie.Type}</p>
          <p>IMDb Rating: {movie.imdbRating} / 10</p>
          </div>
        
        <div className="card-body" style={{fontSize: "0.7rem", height: "15%"}}>
        <p>Directed by {movie.Director}</p>
        <p>Written by {movie.Writer}</p>
        <p>Cast: {movie.Actors}</p>
        </div>
        <div className="card-body d-flex flex-column justify-content-between" style={{fontSize: "0.7rem", height: "60%"}}>
        <p>{movie.Plot}</p>
        <p><a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">Go to IMDb page</a></p>
        </div>
        </div>
        ))}
        </div>
  );
    }


