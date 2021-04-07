import React, {useState, useEffect} from "react";
import {API} from '../api-service';

function MovieForm(props) {
    const mov = props.movie;
    const [title, setTitle] = useState('');
    const [descp, setDescription] = useState('');

    useEffect(()=> {
        setTitle(mov.title)
        setDescription(mov.descp)
    }, [mov])

    const UpdateClicked = () => {
        console.log("clicked");
        API.updateMovie(props.movie.id,{title,descp})
            .then(resp => props.updateMovie(resp))
        .catch(resp=>console.log(resp))
    };

    const CreateClicked = () => {
        console.log('clicked');
        API.createMovie({title,descp })
            .then(r => props.createMovie(r))
            .catch(resp=>console.log(resp))
            
    };

    return(
        <React.Fragment>
            {mov ? (
                <div>
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" onChange={evt => setTitle(evt.target.value)} id="title" value={title} placeholder="title"/><br/>

                    <label htmlFor="description">Description</label><br/>
                    <textarea name="description" onChange={evt => setDescription(evt.target.value)} id="description" value={descp} placeholder="description"/><br/>
                    <br/>
                    {
                        mov.id ?
                            <input type="submit" onClick={evt => UpdateClicked()} value={"Update"}/>
                            :
                            <input type="submit" onClick={evt =>CreateClicked()} value={"Create"}/>
                    }


                </div>

            ) : null}
        </React.Fragment>
    )
}
export default MovieForm;