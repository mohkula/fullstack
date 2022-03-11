import patientData from '../../data/patients';
import { EntryWithoutId, Entry } from '../types';
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

   const addEntry = (entry: EntryWithoutId, id: string): Patient | undefined =>{
    

    const patientToModify = patientData.find( p => p.id === id);

    
    


    const newEntry: Entry = {

     ...entry,
      id: uuid()
      
     

    };

    if(patientToModify){
      patientToModify.entries = patientToModify.entries.concat(newEntry) ;
      
    }


 

    

    return patientToModify;

   };


   const findById = (id: string): Patient|undefined => {
    const patient = patientData.find(d => d.id === id);

   
    return patient;
  };







export default {
  getEntries,
  
  addPatient,
  findById,
  addEntry
};