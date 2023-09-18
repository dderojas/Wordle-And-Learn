type Test = {
  key: string;
  color: string;
}

type RowProps = {
  guess: Test[];
  key: number;
  currentGuess: string;
}

export const Row = ({ guess, currentGuess }: RowProps) => {

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
        {[...Array(5 - letters.length)].map((_,i) => (
          <div key={i}></div>
        ))}
      </div>
    )
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
  
}