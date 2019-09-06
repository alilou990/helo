import React, { Component } from 'react'
import routes from './routes'


import Nav from './components/Nav/Nav'


import 'reset-css'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <Nav />
        {routes}
      </div>
    )
  }
}
