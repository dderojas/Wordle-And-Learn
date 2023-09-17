import React, { useEffect, useState } from 'react'

import { Board } from './Board'
import { Keyboard } from './Keyboard'
import useWordleGame from '../hooks/useWordleGame'

type WordleProps = {
  word: string
}
const Wordle = ({ word }: WordleProps) => {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordleGame(word)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    console.log('here')
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <Board guesses={guesses} />
      <Keyboard usedKeys={usedKeys} />
    </div>
  )
}

export default Wordle