import React, {useState} from 'react'

export const Counter = () => {
    const [count, setCount] = useState(0)

    const improveCount = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <p>Você clicou {count} vezes no botão</p>
            <button onClick={improveCount} Clique Aqui></button>
        </div>
    )
}