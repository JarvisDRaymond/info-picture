import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

export default function Insights(props) {
  const [output, setOutput] = useState("");
  const [insightsArr, setInsightsArr] = useState("");
  const [insights2Arr, setInsights2Arr] = useState("");

  // d3 charts
  useEffect(() => {
    /* CHART ONE */
    var data = insightsArr.split(",");
    let colours = ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"];
    

    var width = 400,
      scaleFactor = 30,
      barHeight = 25;

    var graph = d3
      .select(".insightsSvg")
      .append("svg")
      .attr("width", width)
      .attr("height", barHeight * data.length);

    var bar = graph
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
      });

    bar
      .append("rect")
      .attr("fill", (d, i) => colours[i])
      .attr("height", barHeight - 1)
      .attr('width',0)
      .transition()
      .duration(300)
      .attr("width", function (d) {
        return d * scaleFactor;
      });
      
    bar
      .append("text")
      .attr("x", function (d) {
        return d * scaleFactor + 5;
      })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function (d) {
        return d;
      });

    /* CHART TWO */

    var data = insights2Arr.split(",");
    
    const g = d3
      .select("#chart")
      .style('overflow','visible')
      .attr("height", 300)
      .attr("width", 300)
      .selectAll("g")
      .data(data)
      .enter()
      .append("g");
    g.append("circle")
      .attr("cy", 150)
      .attr("cx", (d, i) => (i + 1) * 80)
      .attr("r", (d) => d)
      .style("fill", (d, i) => colours[i])
      .attr('opacity',0)
      .transition()
      .duration(400)
     .attr('opacity',1);
    g.append("text")
      .attr("y", 100)
      .attr("x", (d, i) => (i + 1) * 75)
      .text((d) => d);
  }, [output]);
  //end d3 chart

  const updateOutput = () => {
    console.log("Ran Update Output");
    console.log("customers", props.customers);
    console.log("currCustomer", props.currCustomer);
    if (props.customers.length === 0) {
      setOutput("Data not retrieved");
    } else {
      props.customers.forEach((customer) => {
        if (customer["customer-name"] === props.currCustomer) {
          setInsightsArr(customer["insights-arr"]);
          setInsights2Arr(customer["insights-arr2"]);
          setOutput(
            <div className="insights" key={customer.id}>
              <div className="flex-container">
                <div className="flex-left">
                  <p>{customer["insights-text"]}</p>
                </div>
                <div className="flex-right">
                  <div className="insightsSvg"></div>
                </div>
              </div>
              <div className="flex-container">
              <div className="flex-left">
                <p>{customer["insights-text2"]}</p></div>
               <div className="flex-right"> <svg id="chart"> </svg></div>
              </div></div>
            
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
    <div className="insights">
      <h1>Insights for {props.currCustomer}</h1>
      {output}
    </div>
  );
}
