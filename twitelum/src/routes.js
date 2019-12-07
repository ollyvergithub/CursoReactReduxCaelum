import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import {Redirect} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'

/*
const PrivateRoute = ({component: Component, ...props}) => {
    const isUserAuthenticated = () => Boolean(localStorage.getItem("TOKEN"))

    if(isUserAuthenticated()) {
        return <Component {...props} />
    }
}

*/

class PrivateRoute extends React.Component{

    estaAutenticado = () =>{
        if(localStorage.getItem("TOKEN")){
            return true
        }else{
            return false
        }
    }

    render(){
        const {component: Component, ...props} = this.props

        if(this.estaAutenticado()){
            return <Component {...props}/>
        }else{
            return <Redirect to="/login"/>
        }
    }
  

}

class Roteamento extends React.Component{
    render(){
        return(
            <Switch>
                <PrivateRoute path= "/" exact component= {HomePage}/>
                <Route path= "/login" component= {LoginPage}/>
                <Route component= {NotFoundPage}/>
            </Switch>
        )
    }
}



export default Roteamento
