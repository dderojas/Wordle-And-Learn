// @ts-nocheck
import { Row } from './Row'

export const Board = ({ guesses, currentGuess, turn }) => {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess}/>
        }

        return <Row key={i} guess={g} /> 
      })}
    </div>
  )
}