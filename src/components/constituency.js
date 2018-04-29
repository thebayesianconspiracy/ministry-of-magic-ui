import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';

const Constituency = (props) => {
  return console.log(props) || (
    <div style={{display: 'inline-block', flex: 1, border: '1px black solid', minWidth: props.size[0], height: props.size[1], margin: 5}}>
      <span>{ props.constituency.get('name') }</span>
    </div>
  )
}

const mapStateToProps = ({ constituency }) => ({
  constituency
});

export default connect(mapStateToProps)(Constituency);
