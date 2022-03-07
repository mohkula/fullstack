import axios from 'axios';
import React from 'react';
import { Patient } from './types';
import { apiBaseUrl } from './constants';

import { useStateValue } from "./state";
import { useParams } from 'react-router-dom';





const individualPatientList = () => {

    const [{ patients }, dispatch] = useStateValue();
    


    const { id } = useParams<{ id: string }>();
    
 
    React.useEffect(() =>{
    const getPatient = async () => {
    try{
    const {data: patientFromApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}` );
    
    
    dispatch({type: "SET_ONE_PATIENT", payload: patientFromApi});
    
}

catch (e){
    console.log(e);
}
};
void getPatient();
    }, [dispatch]);

    const patient: Patient |undefined = Object.values(patients).find((patient: Patient) => patient.id === id);


    
return (

   <div>{patient ? <div>{patient.name} {patient.gender} 
   <p>Ssn: {patient.ssn}</p>
    <p>Occupation: {patient.occupation}</p>   </div> :  <div>error</div>  }</div>
    
);
};
export default individualPatientList;