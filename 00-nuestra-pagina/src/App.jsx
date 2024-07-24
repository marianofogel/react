
import fotoMati from '/public/img/image.png'
import fotoMarian from '/public/img/imaage.png'
import { Tablon } from './Table'
import './App.css'

function App() {
  return (
    <>
      <div className='inicioDePagina'>
        <img className='fotoMati' src={fotoMati} alt="Foto Mati" width={230} height={300} />
        <h1> PAGINA DE PRUEBA </h1>
        <img className='fotoMarian' src={fotoMarian} alt="Foto Mati" width={230} height={300} />
      </div>

      <Tablon/>

    </>
  )
}

export default App
