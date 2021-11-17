import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "@firebase/firestore";

export default function Edit(props) {
  const [output, setOutput] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [insightsText, setInsightsText] = useState("");
  const [insightsArr, setInsightsArr] = useState("");
  const [insightsText2, setInsightsText2] = useState("");
  const [insightsArr2, setInsightsArr2] = useState("");
  const [interestText, setInterestText] = useState("");
  const [interestArr, setInterestArr] = useState("");
  const [interestText2, setInterestText2] = useState("");
  const [interestArr2, setInterestArr2] = useState("");
  const [infoPortraitText, setInfoPortraitText] = useState("");

  /*  useEffect(() => {
    console.log("insightsText: ", insightsText);
  }, [insightsText]);

  useEffect(() => {
    //console.log(insightsArr);
  }, [insightsArr]);
  useEffect(() => {
    //console.log(insightsText2);
  }, [insightsText2]);
  useEffect(() => {
    //console.log(insightsArr2);
  }, [insightsArr2]);

  useEffect(() => {
    // console.log(interestText);
  }, [interestText]);
  useEffect(() => {
    //console.log(interestArr);
  }, [interestArr]);
  useEffect(() => {
    //console.log(interestText2);
  }, [interestText2]);
  useEffect(() => {
    //console.log(interestArr2);
  }, [interestArr2]);
  useEffect(() => {
    console.log("customerId: ", customerId);
  }, [customerId]); */

  const updateDB = async (id) => {
    console.info("Results during submit");
    console.log("customerId", id);
    console.log("The insights text is:", insightsText);
    console.log("The insights text type is:", typeof insightsText);
    const customerDoc = doc(db, "customers", id);
    const newFields = {
      "insights-text": insightsText,
      "insights-arr": insightsArr,
      "insights-text2": insightsText2,
      "insights-arr2": insightsArr2,
      "interest-text": interestText,
      "interest-arr": interestArr,
      "interest-text2": interestText2,
      "interest-arr2": interestArr2,
      "info-portrait-text": infoPortraitText,
    };
    await updateDoc(customerDoc, newFields);
    alert("Updated DB");
    window.location.reload(true);
  };

  useEffect(() => {
    updateStates();
  }, [props.customers, props.currCustomer]);

  const updateStates = () => {
    console.log(props.currCustomer);
    props.customers.forEach((customer) => {
      if (customer["customer-name"] === props.currCustomer) {
        console.log("this occurred");
        setInsightsText(customer["insights-text"]);
        setInsightsArr(customer["insights-arr"]);
        setInsightsText2(customer["insights-text2"]);
        setInsightsArr2(customer["insights-arr2"]);
        setInterestText(customer["interest-text"]);
        setInterestArr(customer["interest-arr"]);
        setInterestText2(customer["interest-text2"]);
        setInterestArr2(customer["interest-arr2"]);
        setInfoPortraitText(customer["info-portrait-text"]);
      }
    });
  };

  return (
    <div className="edit">
      <h1>Edit Mode for {props.currCustomer}</h1>
      {props.customers.map((customer) => {
        if (customer["customer-name"] === props.currCustomer) {
          return (
            <>
            <div className="flex-container">
            <div className="flex-left">
              <h5>Insights Text 1 </h5>
              <textarea
                type="text"
                onChange={(e) => setInsightsText(e.target.value)}
                value={insightsText}
              />
              <h5>Insights Data 1 </h5>
              <textarea
                type="text"
                onChange={(e) => setInsightsArr(e.target.value)}
                value={insightsArr}
              />
              <h5>Insights Text 2 </h5>
              <textarea
                type="text"
                onChange={(e) => setInsightsText2(e.target.value)}
                value={insightsText2}
              />
              <h5>Insights Data 1 </h5>
              <textarea
                type="text"
                onChange={(e) => setInsightsArr2(e.target.value)}
                value={insightsArr2}
              /></div>
                          <div className="flex-right">
              <h5>Interest Text 1 </h5>
              <textarea
                type="text"
                onChange={(e) => setInterestText(e.target.value)}
                value={interestText}
              />
              <h5>Interest Data 1 </h5>
              <textarea
                type="text"
                onChange={(e) => setInterestArr(e.target.value)}
                value={interestArr}
              />
              <h5>Interest Text 2 </h5>
              <textarea
                type="text"
                onChange={(e) => setInterestText2(e.target.value)}
                value={interestText2}
              />
              <h5>Interest Data 1 </h5>
              <textarea
                type="text"
                onChange={(e) => setInterestArr2(e.target.value)}
                value={interestArr2}
              />
              <h5>Info Portrait Text </h5>
              <textarea
                type="text"
                onChange={(e) => setInfoPortraitText(e.target.value)}
                value={infoPortraitText}
              />
              </div>     </div>
              <div className="buttonContainer">
                <button
                  className="primaryButton"
                  onClick={() => {
                    updateDB(customer.id);
                  }}
                >
                  Update Customer
                </button>
              </div>
            </>
          );
        }
      })}
      {output}
    </div>
  );
}
