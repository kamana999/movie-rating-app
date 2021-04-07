import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
function MovieDetails(props) {
    const [highlighted, sethightlighted] = useState(-1);
    //const [mov, SetMovie] = useState(props.movie);
    const mov = props.movie;
    const highLightRate = high => evt =>{
        sethightlighted(high)
    }
    const rateClicked = rate =>evt =>{
        console.log("click");
        fetch(`http://localhost:8000/api/movie/${mov.id}/rate_movie/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({stars:rate + 1 })
        })
            .then(resp => getDetailed(resp))
            .catch(error => console.log(error))
    }

    const getDetailed =()=> {
        fetch(`http://localhost:8000/api/movie/${mov.id}/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(resp => props.UpdateDetails(resp))
            .catch(error => console.log(error))
    }

    return(<div>
        <React.Fragment>
        {mov ? (
        <div>
            <h1>{mov.title}</h1>
            <p>{mov.descp}</p>
            <p>{mov.no_of_rating}</p>
            <FontAwesomeIcon  icon={faStar} className={mov.avg_rating > 0 ? 'orange': ''} />
            <FontAwesomeIcon  icon={faStar} className={mov.avg_rating > 1 ? 'orange': ''} />
            <FontAwesomeIcon  icon={faStar} className={mov.avg_rating > 2 ? 'orange': ''} />
            <FontAwesomeIcon  icon={faStar} className={mov.avg_rating > 3 ? 'orange': ''} />
            <FontAwesomeIcon  icon={faStar} className={mov.avg_rating > 4 ? 'orange': ''} />
            <div className="rating-box">
                <h1>Rate IT</h1>
                {
                    [...Array(5)].map((e, i)=> {
                        return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? 'purple': ''}
                                onMouseEnter={highLightRate(i)}
                                onMouseLeave={highLightRate(-1)}
                                onClick={rateClicked(i)} />
                    })
                }
            </div>
        </div>

            ) : null}
        </React.Fragment>
    </div>);
}
export default MovieDetails;