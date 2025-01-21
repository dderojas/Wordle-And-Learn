import { useState, useEffect } from 'react'
import axios from 'axios'
import WordleClone from './components/WordleClone'

const App = () => {
  const [word, setWord] = useState('')
  const [wordLength, setWordLength] = useState('')
  const [dropDownValue, setDropDownValue] = useState('')

// how to have this load on mount and when wordLength changes
  useEffect(() => {
    (async () => {
      if (wordLength) {
        const { data } = await axios.get(`https://random-word-api.vercel.app/api?words=1&length=${wordLength}`)
        // remove when app is done
        console.log(data, 'results.......')
        setWord(data[0])
        setWordLength(data[0].length)
      }
    })()
  }, [wordLength])

  const handleDropDown = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()
    let value: string = (e!.target as HTMLSelectElement)!.value;
    console.log(value)

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
      {!word && 
            <select value={dropDownValue} onChange={handleDropDown}>
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
      {word && <WordleClone word={word} setWord={setWord} rowLength={wordLength} setDropDownValue={setDropDownValue} handleRestart={handleRestart}/>}
    </div>
  );
}

export default App;
