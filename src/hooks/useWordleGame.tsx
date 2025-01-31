//@ts-nocheck
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'

type FormattedGuessType = {
  key: string;
  color: string;
}

type PrevUsedKey = {
  [key: string]: string;
}

type FormattedGuessArr = FormattedGuessType[]

const useWordle = (solution, rowLength, setShowModal) => {
  // turn reflects how many have passed, not current turn
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
    
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    // turn here not updated yet, always -1, e.g. turn > 4 === turn > 5
    if ((currentGuess !== solution) && (turn > 4)) {      
      setTimeout(() => {
        setShowModal(true)
      }, 2000)
    }

    setCurrentGuess('')
  }

  const handleKeyup = async ({ key }: any) => {
    if (key === 'Enter') {
      if (isCorrect || turn > 5) {
        setShowModal(true)

      } else {
        try {
          // call to check word validity
          await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess}`);
          
          if (turn > 5) {
            console.log('you used all your guesses!') // just for development
            return
          }
    
          if (currentGuess.length !== rowLength) {
            toast(`The word must be ${rowLength} chars long`)
            return
          }
          const formatted = formatGuess()
          addNewGuess(formatted)
        } catch(e) {
          console.log(e, 'Something went wrong')
          toast(`That's not a real word!`)
        }
      }
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(key) && !isCorrect) {
      if (currentGuess.length < rowLength) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup }
}

export default useWordle