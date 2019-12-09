import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import {Redirect} from 'react-router-dom'


const PrivateRoute = ({component: Component, ...props}) => {
    const isUserAuthenticated = () => Boolean(localStorage.getItem("TOKEN"))

    if(isUserAuthenticated()) {

        return <Component {...props} />
    }

    return <Redirect to="/login" />
}

const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path="/" component={HomePage} exact />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}

export default Routes





