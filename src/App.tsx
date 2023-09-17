import { useState, useEffect } from 'react'
import axios from 'axios'
import WordleClone from './components/WordleClone'

const App = () => {
  const [word, setWord] = useState('')

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://random-word-api.vercel.app/api?words=1&length=5')
      console.log(data, 'results.......')
      setWord(data[0])
    })()
  }, [])


  return (
    <div>
      { word && <WordleClone word={word}/>}
    </div>
  );
}

export default App;
