import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Interests(props) {
  const [output, setOutput] = useState("");
  const [interestArr, setInterestArr] = useState([]);
  const [interestArr2, setInterestArr2] = useState([]);
  const svgRef = useRef();
  const svgRef2 = useRef();
  // d3 charts
  useEffect(() => {
    /* CHART ONE */
    var width = 200;
    var height = 300;
    let colours = ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"];
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)

    function drawChart(data) {
      const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      console.log('data for chart:', data);
      var selection = svg.selectAll("rect").data(data);
      var yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, height - 100]);
      selection
        .transition()
        .duration(300)
        .attr("height", (d) => yScale(d))
        .attr("y", (d) => height - yScale(d));

      selection
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 45)
        .attr("y", (d) => height)
        .attr("width", 20)
        .attr("height", 0)
        .attr("fill", (d, i) => colours[i])
        .transition()
        .duration(300)
        .attr("height", (d) => yScale(d))
        .attr("y", (d) => height - yScale(d));

      selection
        .exit()
        .transition()
        .duration(300)
        .attr("y", (d) => height)
        .attr("height", 0)
        .remove();
    }

    var i = 0;

    if (interestArr != undefined && interestArr.length) {
      drawChart(interestArr.split(','));
    }

    /* CHART TWO */

    const drawChart2 = (data) =>{

      let dataArr = [];
      let tickArr = [];
      data.forEach((obj, index) => {
        dataArr.push(parseInt(obj));
        tickArr.push(index);
      });
      console.log("Line Chart Data: ", dataArr);
      console.log("Tick Arr: ", tickArr);
  
      //setting up svg
      const w = 300;
      const h = 100;
      const svg = d3
        .select(svgRef2.current)
        .attr("width", w)
        .attr("height", h)
        .style("margin-top", "40px")
        .style("margin-bottom", "50px")
        .style("overflow", "visible");
      // setting the scaling
      const xScale = d3.scaleLinear().domain([0, tickArr.length-1]).range([0, w]);
      const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
      const generateScaledLine = d3
        .line()
        .x((d, i) => xScale(i))
        .y(yScale);
  
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(tickArr.length)
        .tickFormat((d, i) => tickArr[i]);
  
      const yAxis = d3.axisLeft(yScale).ticks(5);
      svg
        .append("g")
        .call(xAxis)
        .classed("xticks", true)
        .attr("transform", `translate(0, ${h}) `);
      svg.append("g").call(yAxis);
      

      // setting the data for the svg
      svg
        .selectAll(".xticks text")
        .attr("transform", "translate(2,0)")
        .attr("text-anchor", "end");
  
      svg
        .selectAll(".line")
        .data([dataArr])
        .join("path")
        .attr("d", (d) => generateScaledLine(d))
        .attr("fill", "none")
        .attr("stroke-width", "2")
        .attr("stroke", "#0a9396");
        svg
        .append("rect")
        .attr('height',100)
        .attr('width',300)
        .attr('y',-1)
        .attr('x',-300)
        .style('transform', 'scaleX(-1)')
        .attr('fill','white')
        .transition()
        .duration(600)
        .attr('width',0)


    } //END OF DRAWCHART 2

    if (interestArr2 != undefined && interestArr2.length) {
      drawChart2(interestArr2.split(','));
    }

  }, [output]);

  // END CHART

  const updateOutput = () => {
    if (props.customers.length === 0) {
      setOutput("Data not retrieved");
    } else {
      props.customers.forEach((customer) => {
        if (customer["customer-name"] === props.currCustomer) {
          setInterestArr(customer["interest-arr"]);
          setInterestArr2(customer["interest-arr2"]);
          setOutput(
            <div key={customer.id}>
              <div className="flex-container">
                <div className="flex-left">
                  <p>{customer["interest-text"]}</p>
                </div>
                <div className="flex-right">
                  <svg ref={svgRef}></svg>
                  <p>Interest Data: {customer["interest-arr"]}</p>{" "}
                </div>
              </div>
              <div className="flex-container">
                <div className="flex-left">
                  <p>{customer["interest-text2"]}</p>
                </div>
                <div className="flex-right">
                <svg ref={svgRef2}></svg>
                  <p>Interest Data 2: {customer["interest-arr2"]}</p>{" "}
                </div>
              </div>
            </div>
          );
        }
      });
    }
  };

  useEffect(() => {
    updateOutput();
    console.log("currCustomer", props.currCustomer);
  }, [props.customers, props.currCustomer]);

  return (
    <>
      <h1>Interests for {props.currCustomer}</h1>
      {output}
    </>
  );
}
