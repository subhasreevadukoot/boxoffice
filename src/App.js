import React from 'react'
import {Switch,Route} from 'react-router-dom'

import Home from './pages/Home'
import Starred from './pages/Starred'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
        <Home/>
        </Route>
        <Route exact path='/starred'>
        <Starred/>
        </Route>

    
        <Route>
Page not defined
        </Route>
      </Switch>
      
    </div>
  )
}

export default App
