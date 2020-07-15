import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Movie( props ) {
  console.log("Movie props", props)
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {console.log(res); history.push('/'); props.setRefresh(true)})
      .catch((err) => console.log(err.response));
  };
  
  

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${params.id}`}>
      <Button variant="outlined">Edit</Button>
      </Link>
      
      <Button variant="outlined" onClick={deleteMovie}>Delete</Button>

    </div>
  );
}

export default Movie;
