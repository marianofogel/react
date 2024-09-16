import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useRef, useEffect, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.length <= 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    } else {
      setError('')
    }

  }, [search]) //dependencias

  return { search, updateSearch, error }
}

function App() {

  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  // ! VER EN QUE CAMBIO: VIDEO APRENDE A PASAR UNA PRUEBA TECNICA...
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('Search', search)
      getMovies({ search })
    }, 300)
    , [getMovies])

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }



  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent'
              }} onChange={handleChange} value={search} type='text' name='query' placeholder='Escribi la pelicula a buscar...'
            />
            <input type="checkbox" onChange={handleSort} checked={sort} />

            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}> {error}</p>}
        </header>

        <main>
          {
            loading ? <p>Cargando... </p> : <Movies movies={movies} />
          }
        </main>
      </div>
    </>
  )
}

export default App
