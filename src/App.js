import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Navs from './components/Navs'

const App = () => {
  return (
    <div>
      <Navs/>
      <Switch>
        <Route exact path='/'>
        home
        </Route>
        <Route exact path='/starred'>
        ss
        </Route>

    
        <Route>
Page not defined
        </Route>
      </Switch>
      
    </div>
  )
}

export default App
