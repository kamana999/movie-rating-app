
export class API {
    static updateMovie(mov, body){
        return fetch(`http://localhost:8000/api/movie/${mov}/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp=>resp.json())
    }

    static createMovie(body){
        return fetch(`http://localhost:8000/api/movie/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp=>resp.json())
    }

    static deleteMovie(movie_id){
        return fetch(`http://localhost:8000/api/movie/${movie_id}/`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}
