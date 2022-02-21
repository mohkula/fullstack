import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {

   
   const h = req.query.height
   const w = req.query.weight
   const bmi = calculateBmi(Number(h),Number(w))

   if(bmi === "bad params"){
res.send ({error: "malformatted parameters"})
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