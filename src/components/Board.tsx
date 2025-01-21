//@ts-nocheck
import { Row } from './Row'

export const Board = ({ guesses, currentGuess, turn, rowLength }:any) => {
  return (
    <div>
      {guesses.map((g:any, i:any) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} rowLength={rowLength}/>
        }

        return <Row key={i} guess={g} rowLength={rowLength}/> 
      })}
    </div>
  )
}