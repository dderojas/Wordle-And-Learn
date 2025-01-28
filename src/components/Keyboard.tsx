const keyboardLetters = [
  {"key": "A"},
  {"key": "B"},
  {"key": "C"},
  {"key": "D"},
  {"key": "E"},
  {"key": "F"},
  {"key": "G"},
  {"key": "H"},
  {"key": "I"},
  {"key": "J"},
  {"key": "K"},
  {"key": "L"},
  {"key": "M"},
  {"key": "N"},
  {"key": "O"},
  {"key": "P"},
  {"key": "Q"},
  {"key": "R"},
  {"key": "S"},
  {"key": "T"},
  {"key": "U"},
  {"key": "V"},
  {"key": "W"},
  {"key": "X"},
  {"key": "Y"},
  {"key": "Z"}
]

export const Keyboard = ({ usedKeys }: any) => {

  return (
    <div className="keyboard">
      {keyboardLetters.map(letter => {
        const color: string = usedKeys[letter.key.toLowerCase()]

        return (
          <div key={letter.key} className={color}>{letter.key}</div>
        )
      })}
    </div>
  )
}