import { useEffect, useState } from "react";

type Guess = {
  key: string;
  color: string;
}

type RowProps = {
  guess?: Guess[];
  key: number;
  currentGuess?: string;
  rowLength: number;
}

export const Row = ({ guess, currentGuess, rowLength }: RowProps) => {
  const [something, setSomething] = useState([])

  useEffect(() => {
    let i = 0
    let result = []

    while (i < rowLength) {
      result.push(<div></div>)
      i++
    }
    //@ts-ignore
    setSomething([...result])
  }, [rowLength])

  if (guess) {
    return (
      <div className="row">
        {guess.map((l, i) => {
          return <div key={i} className={l.color}>{l.key}</div>
  }     )}
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
      {something}
    </div>
  )
  
}