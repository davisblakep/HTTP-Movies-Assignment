import React from 'react';

import EditMovieForm from './EditMovieForm';


const EditMovie = (props) => {
    return(
        <div>
            <EditMovieForm setRefresh={props.setRefresh} />
        </div>
    )
}

export default EditMovie;