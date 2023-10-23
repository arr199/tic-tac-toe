import { useEffect } from 'react'
import { useState } from 'react'
import "./App.css"
import confetti from 'canvas-confetti'
import sound from "./assets/click.wav"

const TURNS = {      
  X : "\u274C",
  O : "O",
}

const winnerArray = [

  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [0,4,8],
]
//CLIKC SOUND

function clickSound() {
new Audio(sound).play()

}
export const  Square = ({ children ,  index , isSelected ,updateBoard,isFilled ,turn}) => {
        
  
      const [hover,setHover] = useState("")
      const myClass = isSelected ? "square bg-class" : "square"
      let squareTextClass =  isFilled ?  "square-text" : "square-text opacity"
      
      function addHover(){
       
        return !isFilled ?  setHover(turn): ""
      }
      
    
      return (
        <div  onMouseEnter={addHover} onMouseLeave={()=> setHover("")} onClick={( () => updateBoard(index) )} className={myClass} key={index}>
          <p  className={squareTextClass} >
         {children ? children : hover  }
          </p>
      </div>

      )      
}

export const GameIsOver = ({ winner , boardIsFull , resetGame} ) => {
   
  return (
        
        <div>
        {  
        // CHECK IF THERE IS A WINNER OR THE BOARD IS FULL ,
        // IF THERE IS NO WINNER BUT ITS FULL ,RENDER 'IS A TIE'
   
          winner || boardIsFull
           ? 
          <header className='container'> 
              <h2 className='winner-text'>{  winner ? `The winner is ${winner}`: "Is a Tie"  } </h2>
              <button onClick={( () => resetGame())} className='play-again-btn'>Play Again</button>
          </header> 
           : ""
        }
         
        </div>

         )
}
export const App = () => {
 
  // MY STATES
 
  const [board , setBoard] = useState(Array(9).fill(null))
  const [turn,setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null)


  // LOAD THE GAME FROM LOCAL STORAGE
  useEffect( () => {
      setBoard( () => {
        const saveBoard = window.localStorage.getItem("board")
        return saveBoard ? JSON.parse(saveBoard) :  Array(9).fill(null)

      } )
      setTurn(()=> {
        const saveTurn = window.localStorage.getItem("turn")
        return saveTurn ? JSON.parse(saveTurn) : TURNS.X

      })

  } ,[]) 
 
  function checkWinner(array) {
 
    for (const i of winnerArray){
       
        const [x,y,z] = i
        //CHECK IF EVERY WINNER COMBINATION HAS THE SAME VALUE
        if (array[x] && array[x] === array[y]  && array[x] === array[z] )
        {
          // IF THE ARRAY HAVE 3 ELEMENTS WITH THE 
          //SAME VALUE IN ANY OF THE WINNER COMBINATION
          // RETURN THE VALUE
          return array[x]

        }
   
    }
    // RETURN NULL , SO THERE IS STILL NO WINNER
    return null
  }
    
  //UPDATE BOARD ON CLICK
  function updateBoard(index) {

    // IF  THIS POSITION HAVE SOME VALUE OR WE HAVE A WINNER ,DO NOTHING 
    if (board[index] || winner) return
    //PLAY SOUND WHEN WE CLICK
    clickSound()
    
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //UPDATE TURN
    const newTurn = turn===TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    //SAVE GAME(BOARD AND TURN) TO LOCAL STORAGE
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn",JSON.stringify(newTurn))


    //CHECK FOR A WINNER ,IF CHECKWINNER 
    //RETURN A VALUE THEN UPDATE THE WINNER STATE TO THAT VALUE
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      
      setWinner(newWinner)
      
      for (let i=0 ; i<2 ;i++) 
      {      
       setTimeout(() => { confetti()
        
       }, 600*i);
       
      }
      }
   
  }
// RESET THE GAME
  function resetGame(){
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
    setBoard( Array(9).fill(null) )
    setTurn(TURNS.X)
    setWinner(null)
  
  }

  return (
    <main >
        <section className={winner || !board.includes(null) ? 'board-section opacity': 'board-section' }>
            <h1 className='title'> Tic Tac toe</h1>
            <div className="board">
              {
                board.map( (e,index) => 
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
                isFilled={board[index] ? true: false}
                turn={turn}

              >  
              {board[index]}
              </Square>)
              }
           </div>
           
        </section>
        <section className={winner || !board.includes(null) ? 'turn opacity' : 'turn'}>
          <Square isFilled={true} isSelected={turn===TURNS.X}>{TURNS.X}</Square>
          <Square  isFilled={true} isSelected={turn===TURNS.O}>{TURNS.O}</Square>
        </section>

        <section className='game-over'>
                <GameIsOver resetGame={resetGame} winner={winner} boardIsFull={!board.includes(null) ? true : false } ></GameIsOver>
        </section>
    </main>
  )
}

