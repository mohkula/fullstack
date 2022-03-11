export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

  export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }


  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
 export interface HospitalEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating?: HealthCheckRating;
    discharge?: {date: string,
    criteria: string};
  }


  export interface OccupationalHealthcareEntry extends BaseEntry {
    type:"OccupationalHealthcare";
    employerName: string;
    sickLeave?: {startDate: string,
                endDate:string};


  }



  
  export type Entry = 
  |HospitalEntry
  |OccupationalHealthcareEntry;
  
  
  export interface Patient {

    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
   occupation: string;

   entries: Entry[];
   
  }
  export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

  type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
  
  export type EntryWithoutId = UnionOmit<Entry, 'id'>;
 

  export type newPatient = Omit<Patient, 'id'>;

  export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'

  }

  




  