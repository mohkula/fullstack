import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { Entry } from '../types';
import {Request} from 'express';
import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  
res.send(patientService.getEntries());  
});

router.get('/:id', (req, res) => {
 
  res.send(patientService.findById((req.params.id)));  
  });

  interface CustomRequest<T> extends Request {
    body: T
  }

router.post('/:id', (req: CustomRequest<Entry>, res) =>{

const id = req.params.id;

  const body: Entry = req.body;

  const date: string = body.date;

  const type: "HealthCheck" | "OccupationalHealthcare" = body.type;

  const specialist: string = body.specialist;

  const description: string = body.description;


  const diagnosisCodes: Array<string> | undefined = body.diagnosisCodes;

  
 switch(body.type){
case 'OccupationalHealthcare':
     const employerName = body.employerName;

     const occupationalEntry: Entry = {

      id: uuid(),
        date: date,
        type: type,
        specialist: specialist,
      employerName: employerName,
        description: description,
        diagnosisCodes: diagnosisCodes
   
      };
      res.send(patientService.addEntry(occupationalEntry, id));
break;

case 'HealthCheck':

  const HealthCheckEntry: Entry = {

    id: uuid(),
      date: date,
      type: type,
      specialist: specialist,
      description: description,
      employerName: ""
 
    };

    res.send(patientService.addEntry(HealthCheckEntry, id));


      

 }

 

  

} );

router.post('/', (req, res) => {

try{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  const newPatient = toNewPatient(body.name, body.dateOfBirth, body.ssn,
    body.gender, body.occupation, );

  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
}

catch(error: unknown){

  let errorMessage = 'something went wrong';

  if(error instanceof Error){
    errorMessage += ' Error: ' + error.message;
  }

  res.status(400).send(errorMessage);

}


});

export default router;