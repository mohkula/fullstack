import { newPatient, Gender } from "./types";


const toNewPatient = (name: unknown, dateOfBirth: unknown, ssn: unknown,
    gender: unknown, occupation: unknown, ): newPatient => {

const newPatient: newPatient = {
name: parseText(name),
dateOfBirth: parseDate(dateOfBirth),
ssn: parseText(ssn),
gender: parseGender(gender),
occupation: parseText(occupation),
entries: []

};

return newPatient;
};


const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };


  const parseText = (text: unknown): string => {
    if (!text || !isString(text)) {
      throw new Error('Incorrect or missing field');
    }
  
    return text;
  };

  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };


  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };





export default toNewPatient;