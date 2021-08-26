import React, {useState, useEffect} from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';



export default function App(props) {
  
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    let mounted = true;
    const getMovies = async () => {
      let res = await axios.get(
        `https://www.omdbapi.com/?i=${props.movieId}&apikey=4079f89d&plot=full`);
        if(mounted){
        setMovies(res.data|| []);
        console.log(movies);
        }
      };
      getMovies();

      return() => {
        mounted = false;
      }
  }, []);
 
  
  
 
    
  return (
    <Container>
        {Object.keys(movies).map((movie) => (
      <div className="result" key={movie}>
        <ul>
        <li key={movie}>
        <img className= "poster" src={movie.Poster} alt="movie poster"></img>
        <h6>Title: {movie.Title}</h6>
        <p>imdbRating: {movie.imdbRating}</p>
        <p>{movie.Type}</p>
        <p>{movie.Year}</p>
        <p>{movie.Genre}</p>
        <p>{movie.Plot}</p>
        <p><a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">IMDB page</a></p>
        </li>
        </ul>
        </div>
        ))}
        </Container>
  );
    }


