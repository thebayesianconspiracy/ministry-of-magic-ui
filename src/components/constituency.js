import React, { Component } from 'react'

const Constituency = (props) => {
  return (
    <div style={{display: 'inline-block', flex: 1, border: '1px black solid', minWidth: props.size[0], height: props.size[1], margin: 5}}>
      <span>Yo {props.name}</span>
    </div>
  )
}

export default Constituency;
