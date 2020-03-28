import React from 'react';
import './App.css';

import {
    BrowserRouter as Router, Route
} from "react-router-dom"

import Reports from "./containers/Reports/Reports"
import Login from "./containers/Login/Login"

function App() {
    return (
        <div>
            <Router>
                <Route path={"/"}>
                    el nav bar
                </Route>
                <Route path={"/login"} exact>
                    <Login/>
                </Route>
                <Route path={"/reports"} exact>
                    <Reports/>
                </Route>

            </Router>
        </div>
);
}

export default App;
