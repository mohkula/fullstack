import express from 'express';
import calculateBmi from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req,res) => {
  try{
  if(!req.body.target|| !req.body.daily_exercises){
   return res.status(400).send({
      error: "parameters missing"
    });

  }
}

catch(error){
  
  console.log(error);
}

const arr: Array<number> = req.body.daily_exercises;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const target: number = req.body.target;




try{
 return res.send(exerciseCalculator(arr, target));
}

catch(error){
 return res.status(400).send({
    error: "malformatted parameters"
  });
}

});



app.get('/bmi', (req, res) => {

   
   const h = req.query.height;
   const w = req.query.weight;
   const bmi = calculateBmi(Number(h),Number(w));

   if(bmi === "bad params"){
res.send ({error: "malformatted parameters"});
   }

    res.send({weight: w,
        height: h,
        bmi: bmi
    
  });

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});