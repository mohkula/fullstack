import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import IndividualPatientList from "./IndividualPatient";
const App = () => {
  const [, dispatch] = useStateValue();
 

  const fetchPatientList = async () => {
    try {
      const { data: patientListFromApi } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
      );
      
     

     
      dispatch(setPatientList(patientListFromApi) );
    } catch (e) {
      console.error(e);
    }

  };
  React.useEffect(() => {
    

  
    void fetchPatientList();
  },[]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Link to = '/'>          <Button  onClick={()=>{
void fetchPatientList();

          }
          } primary>
            Home
          </Button>
          </Link>

          <Divider hidden />
          <Switch>
          <Route path="/patients/:id">
              <IndividualPatientList />
            </Route>
            <Route path="/">
           
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
