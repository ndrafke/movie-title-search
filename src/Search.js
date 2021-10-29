import React, {useState, useEffect} from 'react';
import Results from './Results.js';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default function Search() {
// Search input area for movie title to fetch imdb ID:
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
  // Submit initial search for movie title
  const onSearch = () => {
    getId();
  };
  // Enter key to submit search
  const onKeyDown = (e) => {
    if(e.key === "Enter"){
      getId();
    }
  }  
  // Clear search input
  const onClear = (e) => {
    setSearch("");
    setMovieId([]);
  }
  
  


    return (
      <div>
      <div className="container">
        <div className="d-flex flex-row align-items-center" >
      <img src="https://i.imgur.com/8PVUi1r.png" alt="film reel logo" id="film-logo"></img><h2 className="m-3">Movie Title Search</h2>
      </div>
      <div className="search-container d-flex flex-row align-items-center">
      <input type="text" placeholder="Enter Movie Title..." onChange={e => {setSearch(e.target.value)}} value={search} onKeyDown={onKeyDown} className="search-bar"/>
      <button className="reset btn btn-dark btn-sm" onClick={onClear}><span>Reset</span></button>
      </div>
      <button className="btn btn-primary btn-md" onClick={onSearch} onChange={() => {setSearch("")}} style={{margin: "0.5rem", color: "black", backgroundColor: "lightblue"}}><span>Search</span></button>
      </div>
      <div className="results d-flex flex-wrap justify-content-center">
      {movieId.length > 0 ? 
       (movieId.map(movie => (
       <Results movieId={movie.imdbID} key={movie.imdbID}/>
       ))) : (
         ""
       )}
      </div>
    
    </div>   
        
    )
}