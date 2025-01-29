import { useEffect, useState } from "react"
import axios from "axios"

const Modal = ({ isCorrect, word, turn, setWord, setDropDownValue, setShowModal }: any) => {

  const [definition, setDefinition] = useState('')

  useEffect(() => {
    (async () => {
        const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        setDefinition(data[0].meanings[0].definitions[0].definition)
    })()
  }, [word])

  return (
    <div className="modal" onClick={() => setShowModal(false)}>
      {isCorrect && (
        <div>
          <h1>You Won!</h1>
          <p className="solution">Answer: {word}</p>
          <p>Number of Guesses: {turn}</p>
          <p>Definition: {definition}</p>
          <button className="btn" onClick={() => {
            setWord('')
            setDropDownValue('')
          }}>New Game</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lost!</h1>
          <p className="solution">Answer: {word}</p>
          <p>Better luck next time</p>
          <p>Definition: {definition}</p>
          <button className="btn" onClick={() => {
            setWord('')
            setDropDownValue('')
          }}>New Game</button>
        </div>
      )}
    </div>
  )
}

export default Modal