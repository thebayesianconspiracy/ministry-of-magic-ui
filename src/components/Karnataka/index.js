import React, { Component } from 'react'
import Dimensions from 'react-dimensions'

import { geoPath, geoMercator } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import geoJSONData from './data.json';
import d3Transition from 'd3-transition';

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

    const path = geoPath().projection(geoMercator().scale(3000));

    const g = select(node)
      .append("g");

    let centered;

    const clicked = (d) => {
      let x = width / 2;
      let y = height / 2;
      let k = 1;

      console.log(d, centered);
      if (d && centered !== d) {
        let centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        console.log('x and y are', x, y);
        k = 7;
        centered = d;
      } else {
        centered = null
      }

      g.selectAll("path")
       .classed("active", centered && function(d) { return d === centered; });

      if (centered) {
        g.transition()
         .duration(750)
         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
         .style("stroke-width", 1.5 / k + "px");
      }
    }

    const clicked2 = function({ geometry, properties }) {
      console.log('Clicked!', geometry, properties);
    }
    
    g.attr("class", "states")
     .attr("transform","translate(-4200,750)")
     .selectAll("path")
     .data(topojson.feature(geoJSONData, geoJSONData.objects.karnataka).features)
     .enter().append("path").attr("class","constituencies")
     .attr("id",function(d,i){
       //console.log(d.properties);
	return d.properties.AC_NAME;
     })
     .attr("d", path)
     .on("click", clicked);
  }

  render() {
    return (
      <div style={{display: 'inline-block', flex: 1, border: '1px black solid', margin: 5}}>
        <svg ref={node => this.node = node}
             width={this.props.size[0]}
             height={this.props.size[0]}
        >
        </svg>
      </div>
    )
  }
}
export default Karnataka;
