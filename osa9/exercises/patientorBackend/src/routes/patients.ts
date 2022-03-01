import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  
res.send(patientService.getEntries());  
});

router.get('/:id', (req, res) => {
 
  res.send(patientService.findById((req.params.id)));  
  });

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