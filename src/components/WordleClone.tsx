import { useState, useEffect } from 'react'

import { Board } from './Board'
import { Keyboard } from './Keyboard'
import Modal from './Modal'
import useWordleGame from '../hooks/useWordleGame'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type WordleProps = {
  word: string;
  setWord: (word: string) => void;
  setDropDownValue: (word: string) => void;
  handleRestart: () => void;
  rowLength: string;
}
const Wordle = ({ word, setWord, rowLength, setDropDownValue, handleRestart }: WordleProps) => {
  const [showModal, setShowModal] = useState(false)
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordleGame(word, rowLength, setShowModal)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    // if (isCorrect) {
    //   setTimeout(() => {
    //     setShowModal(true)
    //   }, 2000)
    //   // window.removeEventListener('keyup', handleKeyup)
    // }

    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true)
      }, 2000)
      // window.removeEventListener('keyup', handleKeyup) // may not be necassary
    }

    return () => window.removeEventListener('keyup', handleKeyup)

  }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <ToastContainer />
      <button className='btn' onClick={handleRestart}>Restart</button>
      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} rowLength={rowLength}/>
      <Keyboard usedKeys={usedKeys} />
      {showModal && 
        <Modal
          setWord={setWord} 
          isCorrect={isCorrect} 
          turn={turn} 
          word={word} 
          setDropDownValue={setDropDownValue} 
          setShowModal={setShowModal}
        />
      }
    </div>
  )
}

export default Wordle