import React, { Component } from 'react'
import './App.css'
import Karnataka from './components/Karnataka'
import Constituency from './components/constituency'
class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Karnataka elections</h2>
        </div>
        <div style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}}>
          <Karnataka data={[5,10,1,3]} size={[500,500]} />
          <Constituency size={[500,500]} />
        </div>
      </div>
    )
  }
}
export default App
