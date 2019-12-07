import React from 'react'

const UserContext = (createContext)

class App extends React.Component{

    constructor(){
        super()

        this.state= {
            user: {
                name: 'John Doe',
                imgUrl: 'https://imgur.com/gallery/RZmPpIb'
            }
        }
    }

    render(){
        return <UserContext.Provider value = {this.state.user}>
            <Header />

        </UserContext.Provider>
    }

}

const Header = (props) => {
    return (
        <div>
            <UserInfos/>
        </div>
    )
}

class UserInfos extends React.Component{

    static contextType = UserContext

    render() {
    return (
        <div>
            <span>{this.context.name}</span>
            <img src={this.context.imgUrl}/>
        </div>
    )

}
}