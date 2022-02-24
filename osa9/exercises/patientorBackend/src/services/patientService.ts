import patientData from '../../data/patients';

import { PatientNossn } from '../types';

const getEntries = (): PatientNossn[] => {
    return patientData.map(({ id, name, dateOfBirth,gender,occupation}) =>({
        id, 
            name, 
            dateOfBirth,
            gender,
            occupation
    }));
};








const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient
};