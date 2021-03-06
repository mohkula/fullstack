import { State } from "./state";
import { Diagnosis, Patient } from "../types";



export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
    |{
      type: "SET_ONE_PATIENT";
      payload: Patient;
    }
    |{
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];

    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
    
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

case "SET_ONE_PATIENT":


  return {
  ...state,
    patients: {
     [action.payload.id]: action.payload
    }
    
  };


    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

case "SET_DIAGNOSIS_LIST":
    
        return {
          ...state,
          diagnosis: {
            ...action.payload.reduce(
              (memo, Diagnosis) => ({ ...memo, [Diagnosis.code]: Diagnosis }),
              {}
            ),
            ...state.diagnosis
          }
        };



    default:
      return state;


      

  }


  
};

export const setDiagnosisList = (payload: Diagnosis[]):Action => {
  return {

     type: "SET_DIAGNOSIS_LIST",
      payload: payload
       
  };
};


export const setPatientList = (payload: Patient[]):Action => {
  return {

     type: "SET_PATIENT_LIST",
      payload: payload
       
  };
};

export const setOnePatient = (payload: Patient):Action =>{

  return {
    type:"SET_ONE_PATIENT",
    payload:payload
  };

};

export const addPatient = (payload: Patient):Action =>{
  return{
    type:"ADD_PATIENT",
    payload: payload
  };
};
