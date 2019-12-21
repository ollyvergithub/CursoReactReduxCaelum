import ApiLogin from "../ApiConfig"

export const TweetsService = {

    like: (idDoTweet) => {
        return fetch(`${ApiLogin.url}/tweets/${idDoTweet}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {method: "POST"})
        .then(response => response.json())
        //.then(response => console.log(response))
    },

    carrega: () => {
    return fetch(`${ApiLogin.url}/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
    .then(response => response.json())
    },

    adiciona: (novoTweet) => {
    return fetch(`${ApiLogin.url}/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
    {
        method:"POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({conteudo: novoTweet})
    })
    .then((respostaDoServidor) => respostaDoServidor.json()
    )
},

    remove: idTweetQueVaiSerRemovido =>
    //console.log(idTweetQueVaiSerRemovido)
    fetch(`${ApiLogin.url}/tweets/${idTweetQueVaiSerRemovido}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
    {method:'DELETE'})
    .then((data) => data.json()),

}