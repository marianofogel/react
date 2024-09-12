const API_KEY = 'd0c31d9a'

export const searchMovies = async ({ search }) => {

    if (search)
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
            const json = await response.json()

            const movies = json.Search
            
            return movies?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
            }))
        } catch (e) {
            throw new e ('Error no encontro pelis!')
        }
}
