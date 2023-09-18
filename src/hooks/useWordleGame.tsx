import { useState } from 'react'

type FormattedGuessType = {
  key: string;
  color: string;
}

type PrevUsedKey = {
  [key: string]: string;
}

type FormattedGuessArr = FormattedGuessType[]

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})

  const formatGuess = (): FormattedGuessArr => {
    let solutionArray: string[] = solution.split('')
    let formattedGuess: FormattedGuessArr = currentGuess.split('').map((letter) => {
      return {key: letter, color: 'grey'}
    })

    // green letters
    formattedGuess.forEach((letter, i) => {
      if (solution[i] === letter.key) {
        formattedGuess[i].color = 'green'
        //@ts-ignore
        solutionArray[i] = null
      }
    })
    
    // yellow letters
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        //@ts-ignore
        solutionArray[solutionArray.indexOf(letter.key)] = null
      }
    })

    return formattedGuess
  }

  const addNewGuess = (formattedGuess: FormattedGuessArr) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory(prevHistory => {
      return [...prevHistory, currentGuess]
    })
    setTurn(prevTurn => {
      return prevTurn + 1
    })

    setUsedKeys((prevUsedKeys: PrevUsedKey)  => {
      formattedGuess.forEach(l => {
        const currentColor = prevUsedKeys[l.key]

        if (l.color === 'green') {
          prevUsedKeys[l.key] = 'green'
          return
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[l.key] = 'yellow'
          return
        }
        if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          prevUsedKeys[l.key] = 'grey'
          return
        }
      })

      return prevUsedKeys
    })
    
    setCurrentGuess('')
  }

  // find out how to type this properly
  const handleKeyup = ({ key }: any) => {
    if (key === 'Enter') {
      if (turn > 5) {
        console.log('you used all your guesses!')
        return
      }

      if (history.includes(currentGuess)) {
        console.log('you already tried that word.')
        return
      }

      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.')
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup }
}

export default useWordle