import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientNossn, Patient, newPatient } from '../types';

const getEntries = (): PatientNossn[] => {
    return patientData.map(({ id, name, dateOfBirth,gender,occupation}) =>({
        id, 
            name, 
            dateOfBirth,
            gender,
            occupation
    }));





};

const addPatient = (entry: newPatient): Patient =>{

    const id: string =  uuid();
  
 const newPatient =  {
  id: id,
  ...entry
};

patientData.push(newPatient);

return newPatient;

   };










export default {
  getEntries,
  addPatient
};