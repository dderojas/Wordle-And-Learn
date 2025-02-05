import { Row } from './Row'
import { GuessTypeArr } from './Row'


type BoardType = {
  guesses: GuessTypeArr[];
  currentGuess: string;
  turn: number;
  rowLength: number;
}

export const Board = ({ guesses, currentGuess, turn, rowLength }: BoardType) => {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} rowLength={rowLength}/>
        }

        return <Row key={i} guess={g} rowLength={rowLength}/> 
      })}
    </div>
  )
}