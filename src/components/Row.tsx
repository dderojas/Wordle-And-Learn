
type RowProps = {
  guess: [string]
}

export const Row = ({ guess }: RowProps) => {

  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (
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