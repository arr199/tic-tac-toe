export const GameIsOver = ({ winner, boardIsFull, resetGame }) => {
  return (
    <div>
      {
        // CHECK IF THERE IS A WINNER OR THE BOARD IS FULL ,
        // IF THERE IS NO WINNER BUT ITS FULL ,RENDER 'IS A TIE'

        winner || boardIsFull ? (
          <header className="container">
            <h2 className="winner-text">
              {winner ? `The winner is ${winner}` : "Is a Tie"}{" "}
            </h2>
            <button onClick={() => resetGame()} className="play-again-btn">
              Play Again
            </button>
          </header>
        ) : (
          ""
        )
      }
    </div>
  );
};
