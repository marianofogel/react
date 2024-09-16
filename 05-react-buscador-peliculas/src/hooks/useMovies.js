import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../service/movies'

export function useMovies({ search, sort }) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
            if (search === previousSearch.current) return

            try {
                setLoading(true)
                setError(null)
                previousSearch.current = search
                const newMovies = await searchMovies({ search })
                setMovies(newMovies)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }, [])

    const sortedMovies = useMemo(() => { // LA IDEA ERA LOGRAR QUE SI EL BUSCADOR ERA VACIO, NO TIRE ERROR, CHATGPT: USA VERIFICACION DE SI SIGUE SIENDO UN ARRAY, QUE DEVUELVA EL ARRAY VACIO
        if (Array.isArray(movies) && movies.length > 0) {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
        }
    }, [sort, movies])


    return { movies: sortedMovies, getMovies, loading, error}
}