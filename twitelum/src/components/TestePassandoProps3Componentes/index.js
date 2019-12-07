import React from 'react'

class TestePassandoPropsEntreComponetes extends React.Component{

    constructor(){
        super()

        this.state= {
            user: {
                name: 'John Doe',
                imgUrl: 'https://'
            }
        }
    }

    render(){
        return <Header user={this.state.user}/>
    }

}

const Header = (props) => {
    return (
        <div>
            <UserInfos user={props.user}/>
        </div>
    )
}

const UserInfos = ({user}) => {
    return (
        <div>
            <span>{user.name}</span>
            <img src={user.imgUrl}/>
        </div>
    )
}