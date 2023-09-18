import { useEffect, useState } from "react"
import axios from "axios"


export const SideBar = ({ word }: any) => {
  const [definition, setDefinition] = useState('')

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      console.log(data, 'inmodal????')
      setDefinition(data[0].meanings[0].definitions[0].definition)
    })()
  }, [word])

  return (
    <div className={`sidebar open`}>
      <h3>Definition</h3>
      <button>
        X
      </button>
      <p>{definition}</p>
      <button>
        TEST
      </button>
    </div>
  )
}