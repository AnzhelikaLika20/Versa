import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import './css/index.css'
import MainFrame from './components/MainFrame'
import NotFound from './components/NotFound'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route component={MainFrame} exact path="/"/>
                <Route component={NotFound} path="**"/>
                <Redirect to="**"/>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))
