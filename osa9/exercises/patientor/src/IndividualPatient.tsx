import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Patient, Entry, Diagnosis } from './types';

import { useStateValue } from "./state";
import { useParams } from 'react-router-dom';





const individualPatientList = () => {

    const [{ patients,diagnosis } ] = useStateValue();
 


    const { id } = useParams<{ id: string }>();
    
 
  

    const patient: Patient |undefined = Object.values(patients).find((patient: Patient) => patient.id === id);

    
const getDiagnosisDescription = (code: string) =>{
    const diag: Diagnosis | undefined = Object.values(diagnosis).find((diagnosis: Diagnosis) => diagnosis.code === code);
   
  
return diag?.name;
};

return (

   <div>{patient ? <div>{patient.name} {patient.gender} 
   <p>Ssn: {patient.ssn}</p>
   
    <p>Occupation: {patient.occupation}</p>  
    
    <h2>entries</h2>

    {patient.entries.map(e => (
        <div key = {e.id}> 
        {e.date} {e.description}

        {e.diagnosisCodes?.map(dc => (
           <li key={dc}>

               {dc} {getDiagnosisDescription(dc)}

           </li>
        ))}



        </div>))}

     </div> 
   
    :  <div>error</div>  
    
    }
    
    
    
    

    

    </div>
);
};
export default individualPatientList;