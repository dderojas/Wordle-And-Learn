import { useState, useEffect } from 'react'
import axios from 'axios'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'
import Modal from './components/Modal'
import useWordleGame from './hooks/useWordleGame'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [word, setWord] = useState('')
  const [wordLength, setWordLength] = useState('')
  const [dropDownValue, setDropDownValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  let rowLength = Number(wordLength)
  const { 
    currentGuess, 
    guesses, 
    turn, 
    isCorrect, 
    usedKeys, 
    handleKeyup 
  } = useWordleGame({ word, rowLength, setShowModal })

  useEffect(() => {
    (async () => {
      if (wordLength) {
        const { data } = await axios.get(`https://random-word-api.vercel.app/api?words=1&length=${wordLength}`)

        setWord(data[0])
        setWordLength(data[0].length)
      }
    })()
  }, [wordLength])

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    return () => window.removeEventListener('keyup', handleKeyup)

  }, [handleKeyup, isCorrect, turn])

  const handleDropDown = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()
    let value: string = (e!.target as HTMLSelectElement)!.value;

    setDropDownValue(value)
    setWordLength(value)
  }

  const handleRestart = () => {
    setDropDownValue('')
    setWordLength('')
    setWord('')
  }

  return (
    <div>
      {!dropDownValue && <img src="/learning_image.jpg" alt="Learning"/> }
      <h1>Wordle and Learn</h1>
      {!word && 
          <select className="dropDownMenu" value={dropDownValue} onChange={handleDropDown}>
            <option value="">Select Word Length</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
      }
      { word && 
          <div>
            <ToastContainer autoClose={1000} />
            <button className='btn' onClick={handleRestart}>New Game</button>
            <Board guesses={guesses} currentGuess={currentGuess} turn={turn} rowLength={rowLength} />
            <Keyboard usedKeys={usedKeys} />
            {showModal && 
              <Modal
                setWord={setWord}
                isCorrect={isCorrect}
                turn={turn}
                word={word}
                setDropDownValue={setDropDownValue}
                setShowModal={setShowModal}
              />
            }
          </div>
        }
    </div>
  );
}

export default App;
