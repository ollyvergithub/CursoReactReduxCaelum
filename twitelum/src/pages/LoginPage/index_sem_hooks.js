import React, {Component, Fragment} from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import {NotificacaoContext} from "../../context/NotificacaoContext"
import InputFormField from "../../components/InputFormField"
import LoginService from "../../services/LoginService"

import FormManager from "../../components/FormManager"

import './loginPage.css'


class LoginPage extends Component {

    static contextType = NotificacaoContext

    // Só precisamos do constructor e super para usar o this dentro do constructor

    state = {
        values: {
            inputLogin: '',
            inputSenha: ''
        },

        errors: {}
    }

    formValidations = () => {

        console.log()

        const {inputLogin, inputSenha} = this.state.values;
        const errors = {}

        if (!inputLogin) errors.inputLogin = "O campo Login é Obrigatório"
        if (!inputSenha) errors.inputSenha = "Esse campo é obrigatório"

        this.setState({errors})
    }


    onFormFieldChange = ({target}) => {
        const value = target.value;
        const name = target.name;
        // Substitui o this.state com qualquer nome e qualquer valor
        const values = {...this.state.values, [name]: value};

        // evita a redeundancia this.setState({values: values}) e chama uma função de callback
        this.setState({values}, () => {
            this.formValidations();
        });

    };


    fazerLogin = (infosDoEvento) => {
        infosDoEvento.preventDefault()

        const dadosLogin = {
            login: this.state.values.inputLogin,
            senha: this.state.values.inputSenha,
        }

        LoginService.logar(dadosLogin)
            .then(() => {
                this.context.setMsg("Bem vindo ao Twitelum, login efetuado com sucesso")
                this.props.history.push('/')
            }).catch(erro => {
            this.context.setMsg(`[Erro ${erro.status}] - ${erro.message}`)
        })


    }

    render() {
        return (
            <Fragment>
                <Cabecalho/>
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form onSubmit={this.fazerLogin} className="loginPage__form" action="/">

                                <InputFormField
                                    tipo={"text"}
                                    id="inputLogin"
                                    label="Login: "
                                    onChange={this.onFormFieldChange}
                                    values={this.state.values}
                                    errors={this.state.errors}
                                />

                                <InputFormField
                                    tipo={"password"}
                                    id="inputSenha"
                                    label="Senha: "
                                    onChange={this.onFormFieldChange}
                                    values={this.state.values}
                                    errors={this.state.errors}
                                />



                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage