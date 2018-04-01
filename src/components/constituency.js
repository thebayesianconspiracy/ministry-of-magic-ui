import React, { Component } from 'react'

const Constituency = (props) => {
  return (
    <div style={{display: 'inline-block', flex: 1, border: '1px black solid'}}>
      <span>Yo {props.name}</span>
    </div>
  )
}

export default Constituency;
