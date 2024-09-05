import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useRef, useEffect } from 'react'

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

    if (search.startsWith('a',0)) {
      setError('Como va a empezar con A, pedazo de puto.')
    }


  }, [search])

  return { search, updateSearch, error }
}

function App() {

  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()


  // ! VER EN QUE CAMBIO: VIDEO APRENDE A PASAR UNA PRUEBA TECNICA...
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }


  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} type='text' name='query' placeholder='Escribi la pelicula a buscar...' />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}> {error}</p>}
        </header>

        <main>
          <Movies movies={movies} />
        </main>
      </div>
    </>
  )
}

export default App
