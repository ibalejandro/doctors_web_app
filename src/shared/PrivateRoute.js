import React, {useEffect} from "react"
import {Route} from "react-router-dom"
import {useAuth0} from "./Auth"

const PrivateRoute = ({component: Component, path, ...rest}) => {

    const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

    useEffect(() => {
        const redirection = async () => {
            loginWithRedirect()
            //return <Route path={path} render={render} {...rest} />
        }
        if (!loading && !isAuthenticated) {
            redirection()
        }
    }, [loading, isAuthenticated, loginWithRedirect])
    const render = props =>
        isAuthenticated === true ? <Component {...props} /> : null
    return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute
