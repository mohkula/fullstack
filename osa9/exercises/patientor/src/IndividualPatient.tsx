import React from 'react';
import { Patient, Diagnosis } from './types';
import entryDetails from './components/EntryDetails';
import { useStateValue, setOnePatient } from "./state";
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import AddEntryModal from './AddPatientModal/entryIndex';
import { PatientEntryValues } from './AddPatientModal/AddEntryForm';
import axios from "axios";
import { apiBaseUrl } from './constants';



const individualPatientList = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = React.useState<string | undefined>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);


    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };
    const [{ patients,diagnosis },dispatch ] = useStateValue();
 
const submitNewEntry = async(values: PatientEntryValues) =>{
    
    try {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}`,
          values
        );
       
        dispatch(setOnePatient(updatedPatient));

        closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown error');
      }

};

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

        {e.diagnosisCodes ? 
        
        e.diagnosisCodes.map(dc => (
            <li key={dc}>
 
                {dc} {getDiagnosisDescription(dc)}
                {entryDetails(e)}
               
                
 
            </li>
         ))
        
        : entryDetails(e)}
        





        </div>))}

     </div> 
   
    :  <div>error</div>  
    
    }
    
    
    <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    

    <Button onClick={() => openModal()}>Add New Entry</Button>

    </div>
);
};
export default individualPatientList;