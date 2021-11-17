import { useState, useEffect } from "react";


export default function InfoPortrait(props) {
  const [output, setOutput] = useState("");

  const updateOutput = () => {
    console.log("Ran Update Output");
    console.log("customers",props.customers);
    console.log("currCustomer",props.currCustomer);
    if (props.customers.length === 0) {
      setOutput("Data not retrieved");
    } else {
      props.customers.forEach((customer) => {
        if (customer["customer-name"]=== props.currCustomer) {
          setOutput(
            <div className="flex-container" key={customer.id}>
              <p>{customer["info-portrait-text"]}</p>
            </div>
          );
        }
      });
    }
  };

  useEffect(() => {
    updateOutput();
    console.log('currCustomer', props.currCustomer);
  }, [props.customers, props.currCustomer]);

  return (
    <>
      <h1>Info Portrait for {props.currCustomer}</h1>
      {output}
    </>
  );
}
