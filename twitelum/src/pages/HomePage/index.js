import React, {Component, Fragment} from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import ApiLogin from "../../ApiConfig"
import Tweet from '../../components/Tweet'
import Helmet from "react-helmet"
import {Modal} from "../../components/Modal"

// Simulando um Helper
const isButtonDisabel = (novoTweet) => {
    return novoTweet.length > 140 || novoTweet.length === 0
}

// As chaves {} obriga dar um return
// Se chamarmos a funcao com (), se tiver setState ficará num Loop infinito

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
            lista: ['item 01', 'item 02'],
            tweetAtivoNoModal: {}
        }
    }

    componentDidMount(){
        fetch(`${ApiLogin.url}/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then(response => response.json())
        .then((tweets) =>{
            this.setState({tweets})
        })
    }

    abreModal = tweetQueVaiProModal => {
        this.setState({
            tweetAtivoNoModal: tweetQueVaiProModal,
        }, () => {
            console.log(this.state.tweetAtivoNoModal)
        })
    }

    fechaModal = () => this.setState({tweetAtivoNoModal:{} })

    removeTweet(idTweetQueVaiSerRemovido){
        console.log(idTweetQueVaiSerRemovido)
        fetch(`${ApiLogin.url}/tweets/${idTweetQueVaiSerRemovido}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        {method:'DELETE'})
        .then((data) => data.json())
        .then((response) => {
            console.log(response)
            const listaDeTweetsAtualizada = this.state.tweets.filter((tweet) => tweet._id !== idTweetQueVaiSerRemovido)
            this.setState({
                tweets: listaDeTweetsAtualizada
            })
            this.fechaModal()
        })
    }

    adicionaTweet = (infosDoEvento) => {

        infosDoEvento.preventDefault()

        console.log("Entrei aqui")

        if(this.state.novoTweet.length > 0){

            fetch(`${ApiLogin.url}/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {
                method:"POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({conteudo: this.state.novoTweet})
            })
            .then((respostaDoServidor) => {
                return respostaDoServidor.json()
            })
            .then((tweetVindoDoServidor) =>{
                console.log(tweetVindoDoServidor)
                this.setState({
                    tweets: [tweetVindoDoServidor, ...this.state.tweets]
                })
            })
        }


    }

    mapTweets = () =>{

        const {tweets} = this.state

        console.log("Ollyver ", tweets)

        if(tweets.length) {

            return tweets.map((tweetInfo, index) => 
                <Tweet
                key= {tweetInfo._id}
                id= {tweetInfo._id}
                texto  = {tweetInfo.conteudo}
                usuario  = {tweetInfo.usuario}
                likeado= {tweetInfo.likeado}
                totalLikes= {tweetInfo.totalLikes}
                removivel={tweetInfo.removivel}
                removeHandler={(event) => this.removeTweet(tweetInfo._id)}
                onClickNaAreaDeConteudo={() => this.abreModal(tweetInfo)}

            />)
        }

        return <p>Nenhum Tweet encontrado, crie o seu primeiro Tweet</p>

    }

    render() {

        return (
            <Fragment>
                <Helmet>
                    <title>Twitelum Número de Tweets - ({`${this.state.tweets.le}`})</title>
                </Helmet>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto"/>
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.adicionaTweet}>
                                <div className="novoTweet__editorArea">
                            <span className={
                                `novoTweet__status ${this.state.novoTweet.length > 140 ? ' novoTweet__status--invalido' : ''}`
                            }
                            >
                                {this.state.novoTweet.length}/140</span>
                                    <textarea className="novoTweet__editor"
                                              value={this.state.novoTweet}
                                              onChange={(event) => this.setState({novoTweet: event.target.value})}
                                              placeholder="O que está acontecendo?"></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="novoTweet__envia"
                                    disabled={isButtonDisabel(this.state.novoTweet)
                                    }
                                >
                                    Tweetar
                                </button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea/>
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">

                                {this.mapTweets()}

                                { /*this.state.tweets.length > 0 ? (

                                    this.state.tweets.map(
                                        (tweetInfo, index) => {
                                            return (
                                                <Tweet
                                                    key={tweetInfo + index}
                                                    texto={tweetInfo}
                                                />
                                            )
                                        }
                                    )
                                ) : "Nenhum Tweet encontrado, crie o seu primeiro Tweet"*/}

                            </div>
                        </Widget>
                    </Dashboard>
                </div>
                <Modal
                    isAberto={Boolean(this.state.tweetAtivoNoModal._id)}
                    onFechando={this.fechaModal}
                >
                    {
                        () => (
                            <Tweet
                                key= {this.state.tweetAtivoNoModal._id}
                                id= {this.state.tweetAtivoNoModal._id}
                                texto  = {this.state.tweetAtivoNoModal.conteudo}
                                usuario  = {this.state.tweetAtivoNoModal.usuario}
                                likeado= {this.state.tweetAtivoNoModal.likeado}
                                totalLikes= {this.state.tweetAtivoNoModal.totalLikes}
                                removivel={this.state.tweetAtivoNoModal.removivel}
                                removeHandler={() => this.removeTweet(this.state.tweetAtivoNoModal._id)}

                        />
                        )
                    }

                </Modal>
            </Fragment>
        );
    }
}

export default HomePage;
