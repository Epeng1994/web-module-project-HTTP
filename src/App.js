import React, { useEffect, useState,  } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm'
import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const history = useHistory();

  useEffect(()=>{
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
      .then(res=>{
        setMovies(res.data)
        setFavoriteMovies(favoriteMovies.filter(a=>a.id !== id))
      })
      .catch(err=>{
        console.log(err)
      })
    history.push('/movies')
  }

  const addToFavorites = (movie) => {
    //console.log(movie)
    
    if(favoriteMovies.find(a=> a.id === movie.id) === undefined || favoriteMovies.length === 0){
      setFavoriteMovies([...favoriteMovies, movie])
    }else{
      alert('You already favorited that movie')
    }
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
          <Switch>
            <Route exact path="/movies/add">
              <AddMovieForm setMovies={setMovies}/>
            </Route>
            <Route exact path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>
            <Route exact path="/movies/:id">
              <Movie deleteMovie={deleteMovie} addToFavorites ={addToFavorites}/>
            </Route>
            <Route exact path="/movies">
              <MovieList movies={movies}/>
            </Route>
            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

