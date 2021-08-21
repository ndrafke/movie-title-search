import React, {useState, useEffect} from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';



function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies();
  }, []);
 

  const getMovies = async () => {
    const apiResponse = await axios.get(
      `https://www.omdbapi.com/?s=${search}&apikey=4079f89d`
    );
    setMovies(apiResponse.data.Search || []);
    console.log(apiResponse.data.Search);
  };

  const onClick = () => {
    getMovies();
  };

  return (
    <Container className="container">
      <h2>Quick Movie Title Search</h2>
      <input type="text" placeholder="Search..." onChange={e => {setSearch(e.target.value)}}/>
      <div className="btn btn-primary btn-sm" onClick={onClick} style={{margin: "0.5rem"}}>Search</div>
    <div>
    {movies.map((movie) => (
      <div className="result" key={movie.imdbID}>
        <ul>
        <li key={movie}>
        <img className= "poster" src={movie.Poster} alt="movie poster"></img>
        <h6>{movie.Title}</h6>
        <p>{movie.Type}</p>
        <p>{movie.Year}</p>
        <p><a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">IMDB page</a></p>
        </li>
        </ul>
      </div>

    ))}

    </div>
    </Container>

  );
}

export default App;