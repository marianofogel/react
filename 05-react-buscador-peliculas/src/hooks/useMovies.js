import withResults from '../mocks/with-results.json'
import withOutResult from '../mocks/no-results.json'
import { useState } from 'react'

export function useMovies({ search }) {
    const [responseMovies, setResponseMovies] = useState([])
    
    const movies = responseMovies.Search

    const mappedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }))

    const getMovies = () => {
        if (search) {
            setResponseMovies(withResults)
        } else {
            setResponseMovies(withOutResult)
        }
    }

    return { movies: mappedMovies, getMovies }

}