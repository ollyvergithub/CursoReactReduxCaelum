import React from 'react'

class Button extends React.Component{
    render(){

        return(
            <button className={`btn btn-${this.props.tipo}`}>
                {this.props.children}
            </button>
        )
        
    }
}

export default Button