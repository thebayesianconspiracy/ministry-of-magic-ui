import React, { Component } from 'react'
import Dimensions from 'react-dimensions'
import { connect } from 'react-redux'
import _ from 'lodash';
import Dropdown from 'react-dropdown';

import { geoPath, geoMercator } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import d3Transition from 'd3-transition';

import geoJSONData from './data.json';
import { setConstituency } from '../../actions/constituency';

const topojson = require('topojson');

const dataMap = {};

class Karnataka extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
    this.state = {};
  }
  componentDidMount() {
    this.createBarChart()
  }

  componentWillReceiveProps(nProps) {
    const newName = nProps.constituency.get('name');
    const currentName = this.props.constituency.get('name');
    if (newName !== currentName) {
      const d = _.get(dataMap, newName);
      this.clicked(d);
    }
  }
  
  createBarChart() {
    const node = this.node
    const [width, height] = this.props.size;

    const path = geoPath().projection(geoMercator().scale(3000));

    const g = select(node)
      .append("g");

    let centered;

    this.itemClicked = (d) => {
      const { properties } = d;

      this.props.dispatch(setConstituency({ properties }));
    }

    this.clicked = (d) => {
      let x = width / 2;
      let y = height / 2;
      let k = 1;

      if (d && centered !== d) {
        let centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 7;
        centered = d;
      } else {
        centered = null
      }

      if (centered) {
        g.selectAll("path")
         .classed("active", centered && function(d) { return d === centered; });
        
        g.transition()
         .duration(750)
         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
         .style("stroke-width", 1.5 / k + "px");
      }
    }

    const features = topojson.feature(geoJSONData, geoJSONData.objects.karnataka).features;

    console.log('Features are', features);
    
    g.attr("class", "states")
     .attr("transform","translate(-4200,750)")
     .selectAll("path")
     .data(features)
     .enter().append("path").attr("class","constituencies")
     .attr("id", function (d,i) {
       return d.properties.AC_NAME
     })
     .each(function (ds) {
       dataMap[_.get(ds, 'properties.AC_NAME')] = ds;
     })
     .attr("d", path)
     .on("click", this.itemClicked);
  }

  _onSelect(cons) {
    const d = _.get(dataMap, cons.value);
    console.log(cons, d);
    if (d) {
      this.clicked(d);
    }
  }

  render() {
    const options = _.keys(dataMap);
    return (
      <div>
        <Dropdown options={options} onChange={this._onSelect.bind(this)} placeholder="Select an option" value={this.props.constituency.get('selected')} />
      <div style={{display: 'inline-block', flex: 1, border: '1px black solid', margin: 5}}>
        <svg ref={node => this.node = node}
             width={this.props.size[0]}
             height={this.props.size[0]}
        >
        </svg>
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({ constituency }) => ({
  constituency
});

export default connect(mapStateToProps)(Karnataka);
