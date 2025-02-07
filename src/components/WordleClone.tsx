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
  rowLength: number;
}

const Wordle = ({ word, setWord, rowLength, setDropDownValue, handleRestart }: WordleProps) => {
  const [showModal, setShowModal] = useState(false)
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordleGame({ word, rowLength, setShowModal })

  // useEffect(() => {
  //   window.addEventListener('keyup', handleKeyup)

  //   return () => window.removeEventListener('keyup', handleKeyup)

  // }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <button className='btn' onClick={handleRestart}>New Game</button>
      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} rowLength={rowLength} handleKeyup={handleKeyup}/>
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