
interface courseContent {
    courseParts: Array<{name: string, exerciseCount: number}>
  }

const content = (props:courseContent) =>{
    
return(

    <div>
        <h2>Courses:</h2>
        {props.courseParts.map(x => {
       return <li key={x.name}>
           {x.name} exercises: {x.exerciseCount}
           </li>
    })}</div>
)

}


export default content;