

type Result = string;

const calculateBmi =(height: number, weight: number): Result =>{

    if(height === 0 || weight === 0){
        return "Height nor weight shall not be zero";
    }
    const bmi = weight/Math.pow(height/100, 2);
    

   if(bmi >= 18.5 && bmi <= 25){
       return "Normal (healthy weight)";
   }

   if(bmi > 25){

    return "Over (overweight)";
   }

   if(bmi < 18.5 ){
       return "Under (underweight)";
   }

   return "bad params";


    

};

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

export default calculateBmi;