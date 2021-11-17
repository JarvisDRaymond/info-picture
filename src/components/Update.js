import { useState, useEffect } from "react";
export default function Update({ customers, currCust }) {
  const [output, setOutput] = useState("");

  const updateOutput = () => {
    console.log("customers",customers);

    if (customers === undefined || customers.length === 0) {
      setOutput("Data not retrieved");
    } else {
      customers.forEach((customer) => {
        if (customer.name === currCust) {
          setOutput(
            <div key={customer.id}>
              <h1>Update for {customer.name}</h1>
            </div>
          );
        }
      });
    }
  };

  useEffect(() => {
    updateOutput();
  }, [customers, currCust]);

  return (
    <>
      <h1>Update</h1>
      {output}
    </>
  );
}
