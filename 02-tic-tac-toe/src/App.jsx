import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TURNS = {
  X: 'X',
  O: 'O'
}


const Square = ({ children, isSelected, updateBoard, index }) => {
  const jugadorActual = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={jugadorActual}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  //NULL ES QUE NO HAY GANADOR, FALSE ES QUE HAY EMPATE.
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    //REVISAMOS TODAS LAS COMBINACIONES GANADORAS PARA VER SI X u O gano.
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    //SI NO HAY GANADOR
    return null
  }




  const updateBoard = (index) => {
    //NO ACTUALIZAMOS ESTA POSICION SI HAY ALGO:
    if (board[index]) return

    const newBoard = [...board] //spread
    newBoard[index] = turn
    setBoard(newBoard) //actualizamos el board, y que se vea visualmente.

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X //CAMBIAR EL TURNO
    setTurn(newTurn)

  }


  return (
    <main className='board' >
      <h1>TIC TAC TOE</h1>
      <section className='game'>
        {           // EL '_' representa cada elemento del array pero no se utiliza, por eso se usa GUION BAJO.
          board.map((_, index) => { //BOARD: ARRAY -- .map -> crea un nuevo array con los resultados llamados.
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard} //SE EJECUTE, SE ACTUALICE.
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

    </main>
  )
}

export default App
