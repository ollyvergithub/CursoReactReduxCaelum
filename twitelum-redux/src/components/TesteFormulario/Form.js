import React from 'react'

class Form extends React.Component{

    constructor(props){
        super()

        this.state = {
            texto: props.texto,
        }

        mudaTexto = (event) =>{
            this.setState({
                texto: event.target.value
            })
        }

    }

    render(){

        const {texto} = this.state

        return(
            <form className="container">

                <input value={this.state.texto} onChange={this.mudaTexto} type="text"/>

                <p>{texto}</p>

            </form>
        )
    }
}

export default Form
