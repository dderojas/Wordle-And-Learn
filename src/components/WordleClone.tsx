import { useState, useEffect } from 'react'

import { Board } from './Board'
import { Keyboard } from './Keyboard'
import { SideBar } from './SideBar'
import Modal from './Modal'
import useWordleGame from '../hooks/useWordleGame'

type WordleProps = {
  word: string
}
const Wordle = ({ word }: WordleProps) => {
  const [showModal, setShowModal] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordleGame(word)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)

  }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keyboard usedKeys={usedKeys} />
      {showSideBar && <SideBar word={word} />}
      {showModal && <Modal isCorrect={isCorrect} turn={turn} word={word} setShowSideBar={setShowSideBar}/>}
    </div>
  )
}

export default Wordle