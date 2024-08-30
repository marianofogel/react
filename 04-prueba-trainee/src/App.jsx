
import './App.css'
import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';
// const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/hello?fontSize=50&fontColor=red&json=true'


function App() {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })
  //  const [factError, setFactError] = useState()


  const handleClick = async () => {
    refreshFact()
  }


  return (
    <>
      <main>
        <h1>App de Gatitos</h1>

        <button onClick={handleClick}> Cambiar Fact </button>
        {fact && <p> {fact} </p>}
        
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
      </main>
    </>
  )
}

export default App
