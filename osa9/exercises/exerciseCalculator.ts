interface exerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;  
}

const exerciseCalculator = ( ar: Array<number>, target: number) : exerciseResult =>{

   

    const periodLength = ar.length;
    let trainingDays = 0;
    let totalHours = 0;
    ar.map(value => {
    if(value > 0){
        trainingDays = trainingDays + 1;
        totalHours = totalHours + value;
    }
    });

    if(totalHours === 0){
        return {periodLength: 0,
            trainingDays: 0,
            success: false,
            rating: 0,
            ratingDescription: "bad params",
            target: target,
            average: 0,};
    }

    const average = totalHours / periodLength;

    const success = average >= target;
let rating = 1;
let ratingDescription = 'not too bad but could be better';
    

if(average - target > 2){
    rating = 2;
    ratingDescription = 'nice job at reaching your target';
}

if(average - target > 5){
    rating = 3;
    ratingDescription= 'excellent job!';
}



return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
};

};



const arr = [];
for (let i = 3; i< process.argv.length; i++){
arr.push(Number(process.argv[i]));
}



//console.log(exerciseCalculator(arr,Number(process.argv[2])));


export default exerciseCalculator;