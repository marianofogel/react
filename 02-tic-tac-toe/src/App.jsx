import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

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
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board")
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X

  })


  //NULL ES QUE NO HAY GANADOR, FALSE ES QUE HAY EMPATE.
  const [winner, setWinner] = useState(null)



  const checkWinner = (boardToCheck) => {
    //REVISAMOS TODAS LAS COMBINACIONES GANADORAS PARA VER SI X u O gano.
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    //SI NO HAY GANADOR
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  }



  const checkEndGame = (newBoard) => {
    // REVISAMOS si hay un empate, si no hay mas espacios vacios EN EL TABLERO
    return newBoard.every((square) => square !== null)
  }


  const updateBoard = (index) => {
    //NO ACTUALIZAMOS ESTA POSICION SI HAY ALGO:
    if (board[index] || winner) return
    //ACTUALIZAR EL TABLERO
    const newBoard = [...board] //spread
    newBoard[index] = turn
    setBoard(newBoard) //actualizamos el board, y que se vea visualmente.
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X //CAMBIAR EL TURNO
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)


    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      const end = Date.now() + (5 * 1000); //DURACION DE LA ANIMACION: 5*1000 SON LOS SEGUNDOS QUE QUEREMOS QUE DURE.
      const colors = ['#222', '#FFD300', '#FF0000', '#00FF00']; //MANEJO DE COLORES

      (function frame() {
        confetti({
          particleCount: 4, //CANTIDAD DE COLORES QUE QUEREMOS QUE HAYA, y los agarra en el orden del ARRAY
          angle: 60, //ANGULO DE TIRO
          spread: 10, //DESPARRAME
          origin: { x: 0 }, // DEFINE EL PUNTO DE ORIGEN DONDE SE LANZARA LOS CONFETIS, EN ESTE CASO O, SIGNIFICA ESQUINA IZQUIERDA.
          colors: colors // CONTIENE EL ARRAY DE COLORES
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      setWinner((newWinner))
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //EMPATE
    }
  }

  return (

    <main className='board' >
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}> Volver a empezar</button>
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
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : 'Gano:'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }


    </main>
  )
}

export default App
