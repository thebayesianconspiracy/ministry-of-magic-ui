import React, { Component } from 'react'

import { geoPath, geoMercator } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import geoJSONData from './data.json';

const topojson = require('topojson');

class Karnataka extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }
  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }
  createBarChart() {
    const node = this.node
    const [width, height] = this.props.size;

    const path = geoPath().projection(geoMercator().scale(2200));
    
    select(node)
      .append("g")
      .attr("class", "states")
      .attr("transform","translate(-3200,700)")
      .selectAll("path")
      .data(topojson.feature(geoJSONData, geoJSONData.objects.karnataka).features)
      .enter().append("path").attr("class","constituencies")
      .attr("id",function(d,i){
	//console.log(d.properties);
	return d.properties.AC_NAME;
      })
      .attr("d", path);
  }
  render() {
    return (
      <svg ref={node => this.node = node}
           width={500} height={500}>
      </svg>
    )
  }
}
export default Karnataka;
