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
  const onClick = () => {
    getId();
  };
  const onKeyDown = (e) => {
    if(e.key === "Enter"){
      getId();
    }
  }  

  
  


    return (
      <Container className="container">
      <h2>Quick Movie Title Search</h2>
      <input type="text" placeholder="Search..." onChange={e => {setSearch(e.target.value)}} onKeyDown={onKeyDown}/>
      <div className="btn btn-primary btn-sm" onClick={onClick} style={{margin: "0.5rem"}}>Search</div>
      <div>
      
       {movieId.map(movie => (
       <App movieId={movie.imdbID} key={movie.imdbID}/>
       ))}
      </div>
    </Container>
        
        
    )
}