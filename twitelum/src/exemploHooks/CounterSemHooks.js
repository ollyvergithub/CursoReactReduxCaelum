import React from 'react'

class Counter extends React.Component{
    constructor(){
        super()
        this.state = {count: 0}
    }

    improveCount = () => {
        this.setState((state, props) => ({
            count: state.count + 1
        }))
    }

    render() {
        return (
            <div>
                <p>você clicou {this.state.count} vezes no botão</p>
                <button onClick={this.improveCount}>clique aqui</button>
            </div>
        )
    }
}