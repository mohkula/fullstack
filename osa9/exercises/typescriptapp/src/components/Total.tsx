import { createNonNullExpression } from "typescript";

interface courseContent {
    courseParts: Array<{name: string, exerciseCount: number}>
  }

const total = (props:courseContent) =>{

    let totalExercises = 0  
    props.courseParts.map( course => {

        totalExercises += course.exerciseCount;

    })


    return (
<div>

<h2>Total exercises: {totalExercises}</h2>

</div>
        
    )

}
    

export default total;