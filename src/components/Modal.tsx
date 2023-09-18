// @ts-nocheck

const Modal = ({ isCorrect, word, turn, setShowSideBar }) => (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Won!</h1>
          <p className="solution">{word}</p>
          <p>You found the solution in {turn} guesses</p>
          <button onClick={() => setShowSideBar(true)}>SIDEBAR</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lost!</h1>
          <p className="solution">{word}</p>
          <p>Better luck next time</p>
          <button onClick={() => setShowSideBar(true)}></button>
        </div>
      )}
    </div>
  )

export default Modal