import React, { Component } from 'react'
import './App.css'
import Karnataka from './components/Karnataka'
class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Karnataka elections</h2>
        </div>
        <div>
          <Karnataka data={[5,10,1,3]} size={[500,500]} />
        </div>
      </div>
    )
  }
}
export default App
