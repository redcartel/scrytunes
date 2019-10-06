import React, { useState, useEffect } from 'react'
import Root from './containers/Root'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

//import fs from 'fs';
import { remote } from 'electron'
import isDev from 'electron-is-dev'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/profiles/:profile'
          render={props => (
            <Root
              {...props}
              profile={props.match.params.profile}
              playlist={null}
              subScreen={null}
            />
          )}
        />

        <Route
          exact
          path='/profiles/:profile/:playlist'
          render={props => (
            <Root
              {...props}
              profile={props.match.params.profile}
              playlist={props.match.params.playlist}
              subScreen={null}
            />
          )}
        />

        <Route render={p => <Redirect {...p} to='/profiles/default' />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
