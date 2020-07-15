import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { axiosWithAuth } from '../utils/axiosWithAuth';



const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    maxWidth: 400,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    }},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))


export default function EditMovie(props) {
  const classes = useStyles();

  const { id } = useParams();

  const [formState, setFormState] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: "",
    id: "",
})

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then((res) => setFormState(res.data))
    .catch((err) => console.log(err.response));
  }, [id])

const inputChange = (e) => {
    e.persist();
    setFormState({...formState, [e.target.name]: e.target.value});
}


let history = useHistory();


const submitForm = (e) => {
    e.preventDefault();
   
    axios.put(`http://localhost:5000/api/movies/${id}`, formState)
    .then(res => {
        console.log("Update Movie Axios Response", res);
        props.setRefresh(true);
        history.push(`/movies/${id}`)
    })
    .catch(err => {console.log(err)})

    setFormState({title: "",
    director: "",
    metascore: "",
    stars: "",
    id: "",})
        
}

  return (
      <div style={{paddingTop: "4%"}}>
        <Card className={classes.root} style={{opacity: "0.9", marginLeft: "11%"}}>
           <CardContent>
              <Typography variant="h5" component="h2">
               Edit Movie
              </Typography>
              <br />
           <form onSubmit={submitForm} className={classes.form} autoComplete="off">
              <FormControl required>
                 <TextField 
                 autoFocus
                 required={true} 
                 id="title" 
                 name="title"
                 label="Title" 
                 value={formState.title}
                 onChange={inputChange}
                 variant="filled" 
                 />
              </FormControl>
              <FormControl required>
                 <TextField 
                 id="director" 
                 name="director"
                 label="Director" 
                 value={formState.director}
                 onChange={inputChange}
                 variant="filled" 
                 type="text" 
                 required={true}
                 />
               </FormControl>
               <FormControl required>
                 <TextField 
                 id="metascore" 
                 name="metascore"
                 label="Metascore" 
                 value={formState.metascore}
                 onChange={inputChange}
                 variant="filled" 
                 type="text" 
                 required={true}
                 />
               </FormControl>
               <FormControl required>
                 <TextField 
                 id="stars" 
                 name="stars"
                 label="Stars" 
                 value={formState.stars}
                 onChange={inputChange}
                 variant="filled" 
                 type="text" 
                 required={true}
                 />
                 </FormControl>
             <CardActions>
           <Button type="submit" size="small">Submit</Button>
           <Link to={`/movies/${id}`} style={{textDecoration: "none"}}>
           <Button size="small">Cancel</Button>
           </Link>
          </CardActions>
        </form>
      </CardContent>
     </Card>
    </div>
 );
}

