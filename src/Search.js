import React, {useState, useEffect} from 'react'
import { Container } from "react-bootstrap";
import App from './App.js';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default function Search() {

const [search, setSearch] = useState('');
const [movieId, setMovieId] = useState([]);


useEffect(() => {
    getId();
    
    }, []);

  const getId = async () => {
    await axios.get(
      `https://www.omdbapi.com/?s=${search}&apikey=4079f89d&plot=full`).then((res) => {
        console.log(res.data.Search);
        setMovieId(res.data.Search || []);
        console.log(movieId)
      })
  }
  const onSearch = () => {
    getId();
  };
  const onKeyDown = (e) => {
    if(e.key === "Enter"){
      getId();
    }
  }  
  const onClear = (e) => {
    setSearch("");
    setMovieId([]);
  }
  
  


    return (
      <div className="container">
      <h2>Movie Title Search</h2>
      <div className="search-container d-flex flex-row align-items-center">
      <input type="text" placeholder="Enter Movie Title..." onChange={e => {setSearch(e.target.value)}} value={search} onKeyDown={onKeyDown} className="search-bar"/>
      <button className="reset btn btn-danger btn-sm" onClick={onClear}>Reset</button>
      </div>
      <div className="btn btn-primary btn-lg" onClick={onSearch} onChange={() => {setSearch("")}} style={{margin: "0.5rem"}}>Search</div>
      <div>
      {movieId.length > 0 ? 
       (movieId.map(movie => (
       <App movieId={movie.imdbID} key={movie.imdbID}/>
       ))) : (
         <p>No movies found.</p>
       )}
      </div>
    </div>
        
        
    )
}