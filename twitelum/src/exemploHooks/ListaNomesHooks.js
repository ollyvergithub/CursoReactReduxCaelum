import React, { useState } from 'react'

export const NamesList = () => {
  const [names, setNames] = useState([])
  const [inputName, setInputName] = useState('')

  const addName = () => {
    setNames([inputName, ...names])
    setInputName('')
  }

  const removeName = (indexToRemove) => {
    setNames(names.filter((name, index) => index !== indexToRemove))
  }

  return (
    <div>
      <input type="text" onChange={(e) => setInputName(e.target.value)} value={inputName} />
      <button onClick={addName}>Clique aqui</button>
      <br />
      <h3>List of Names:</h3>
      <ul>
        {
          names.map((name, index) => {
            return (
              <li>
                {name}
                <button onClick={() => removeName(index)}>X</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}