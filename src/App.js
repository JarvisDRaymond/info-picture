import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";

import Home from "./components/Home";
import Edit from "./components/Edit";
import Update from "./components/Update";
import Insights from "./components/Insights";
import Interests from "./components/Interests";
import InfoPortrait from "./components/InfoPortrait";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [customers, setCustomers] = useState([]);
  const customersCollectionRef = collection(db, "customers");
  const [selectedOption, setSelectedOption] = useState("big-bank");
  let requestAllowed = true;
  // call on load
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await getDocs(customersCollectionRef);
        setCustomers(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } catch (error) {
        console.error("Error connecting to DB");
      }
    };
    //console.log(customers);
    if (requestAllowed) {
      getCustomers();
      requestAllowed = false;
    }
  }, []);

  return (
    <div className="pageContainer">
      <div className="App">
        <Router basename="/js-examples/info-picture">
          <nav className="nav">
            <select
              name="customerSelect"
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="big-bank">Big Bank</option>
              <option value="big-auto">Big Auto</option>
            </select>
            <NavLink activeClassName="active" to="/">
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/insights">
              Insights
            </NavLink>
            <NavLink activeClassName="active" to="/interests">
              Interests
            </NavLink>
            <NavLink activeClassName="active" to="/info-portrait">
              Info Portrait
            </NavLink>
            <NavLink activeClassName="active" to="/edit">
              Edit
            </NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/insights"
              element={
                <Insights customers={customers} currCustomer={selectedOption} />
              }
            />

            <Route
              path="/interests"
              element={
                <Interests
                  customers={customers}
                  currCustomer={selectedOption}
                />
              }
            />
            <Route
              path="/info-portrait"
              element={
                <InfoPortrait
                  customers={customers}
                  currCustomer={selectedOption}
                />
              }
            />

            <Route
              path="/edit"
              element={
                <Edit customers={customers} currCustomer={selectedOption} />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>

      <footer>
        <hr />
        Jarvis Raymond © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
