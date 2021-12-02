import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './layouts/App.js'
import HomePage from './pages/home'
import { createBrowserHistory } from 'history'

const browserHistory = createBrowserHistory()
const routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/homepage' component={HomePage} />
    </Switch>
  </Router>
)

export default routes
