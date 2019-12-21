import React from 'react'
import Tweet from  '../Tweet'


// As chaves {} obriga dar um return
// Se chamarmos a funcao com (), se tiver setState ficará num Loop infinito
const HomePage = ({tweets}) => {
    return (
        <>

        {
            tweets.map(tweet => <Tweet 
                autor={tweet.autor}
                texto = {tweet.texto}
                />
                
                )
        }

        </>
    )
}

export default HomePage