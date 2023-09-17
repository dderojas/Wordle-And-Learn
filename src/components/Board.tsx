// @ts-nocheck
import { Row } from './Row'

export const Board = ({ guesses }) => {
  return (
    <div>
      {guesses.map((g, i) => {
        return <Row key={i} guess={g} /> 
      })}
    </div>
  )
}