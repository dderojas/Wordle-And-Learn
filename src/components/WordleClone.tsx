import React, { useEffect, useState } from 'react'

import { Board } from './Board'

type WordleProps = {
  word: string
}
const Wordle = ({ word }: WordleProps) => {
  
  return (
    <div>
      <Board guesses={[...Array(6)]} />
    </div>
  )
}

export default Wordle