import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import './css/index.css'
import Main from './components/main'
import NotFound from './components/not-found'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route component={Main} exact path="/"/>
                <Route component={NotFound} path="**"/>
                <Redirect to="**"/>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))
