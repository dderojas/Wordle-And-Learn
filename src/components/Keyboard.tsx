import { useEffect, useState } from 'react'


const keyboardLetters = [
  {"key": "a"},
  {"key": "b"},
  {"key": "c"},
  {"key": "d"},
  {"key": "e"},
  {"key": "f"},
  {"key": "g"},
  {"key": "h"},
  {"key": "i"},
  {"key": "j"},
  {"key": "k"},
  {"key": "l"},
  {"key": "m"},
  {"key": "n"},
  {"key": "o"},
  {"key": "p"},
  {"key": "q"},
  {"key": "r"},
  {"key": "s"},
  {"key": "t"},
  {"key": "u"},
  {"key": "v"},
  {"key": "w"},
  {"key": "x"},
  {"key": "y"},
  {"key": "z"}
]

export const Keyboard = ({ usedKeys }: any) => {
  const [letters, setLetters] = useState(keyboardLetters)

  return (
    <div className="keyboard">
      {letters && letters.map(letter => {
        const color: string = usedKeys[letter.key]
        return (
          <div key={letter.key} className={color}>{letter.key}</div>
        )
      })}
    </div>
  )
}