import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import csvtojson from "csvtojson";

import Container from "react-bootstrap/Container";

import { Tabs, Tab, Navbar } from "react-bootstrap";
import Program from "./components";
import { Alert } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(process.env.REACT_APP_SHEET_URL);
      await csvtojson({})
        .fromString(result.data)
        .then((csvRow) => {
          setData(csvRow.filter((event) => event.show === "TRUE"));
        });
    };

    fetchData();
  }, []);

  const setActiveDay = () => {
    const today = new Date().getDay();
    switch (today) {
      case 5:
        return "patek";
      case 6:
        return "sobota";
      case 7:
        return "nedele";
      default:
        return "patek";
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt="logo"
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            AV21 - Registrace
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Alert variant="info">
        Neprosíme o dodržování daných kapacit a nezkoušení "Ještě se tam vlezu".
        Např. kapacity workshopů si nastavili sami hosté. Děkujeme za pochopení!
      </Alert>

      <Tabs
        defaultActiveKey={setActiveDay()}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="patek" title="Pátek">
          <Program
            blockEvents={data.filter((event) => event.dayType === "1")}
          />
        </Tab>
        <Tab eventKey="sobota" title="Sobota">
          <Program
            blockEvents={data.filter((event) => event.dayType === "2")}
          />
        </Tab>
        <Tab eventKey="nedele" title="Neděle">
          <Program
            blockEvents={data.filter((event) => event.dayType === "3")}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
