import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PublicPatient, Patient, newPatient } from '../types';

const getEntries = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth,gender,occupation, entries}) =>({
        id, 
            name, 
            dateOfBirth,
            gender,
            occupation,
            entries
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


   const findById = (id: string): Patient|undefined => {
    const patient = patientData.find(d => d.id === id);

   
    return patient;
  };







export default {
  getEntries,
  
  addPatient,
  findById
};