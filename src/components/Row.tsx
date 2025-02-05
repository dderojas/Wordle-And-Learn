import { useEffect, useState } from "react";

export type GuessType = {
  key: string;
  color: string;
}

export type GuessTypeArr = GuessType[]

type RowProps = {
  guess?: GuessType[];
  key: number;
  currentGuess?: string;
  rowLength: number;
}

export const Row = ({ guess, currentGuess, rowLength }: RowProps) => {
  const [rowArr, setRowLength] = useState<JSX.Element[]>([])

  useEffect(() => {
    let i:number = 0
    let result = []

    while (i < (rowLength)) {
      result.push(<div></div>)
      i++
    }
  
    setRowLength([...result])
  }, [rowLength])

  if (guess) {
    return (
      <div className="row">
        {guess.map((l, i) => {
          return <div key={i} className={l.color}>{l.key}</div>
        })}
      </div>
    )
  }

  if (currentGuess) {
    let letters = currentGuess.split('')

    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled">{letter}</div>
        ))}
        {[...Array(rowLength - letters.length)].map((_,i) => (
          <div key={i}></div>
        ))}
      </div>
    )
  }

  return (
    <div className="row">
      {rowArr}
    </div>
  )
  
}