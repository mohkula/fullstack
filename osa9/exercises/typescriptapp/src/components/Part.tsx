
interface courseContent {
    courseDetails: {name: string, exerciseCount: number, description: string, groupProjectCount: number,exerciseSubmissionLink: string, requirements: Array<string>}
  }


const part = (props: courseContent) =>{



    switch (props.courseDetails.name) {

        case "Fundamentals":

        return (
<div> 
    <h2>{props.courseDetails.name}  {props.courseDetails.exerciseCount}</h2>  
    {props.courseDetails.description}
    
</div>
        );


        case "Advanced":

            return (
                <div> 
    <h2>{props.courseDetails.name}  {props.courseDetails.exerciseCount}</h2>  
    {props.courseDetails.description}
    
</div>
                        );


                        case "Using props to pass data":
                            return(

                                <div>
                                    <h2>{props.courseDetails.name}  {props.courseDetails.exerciseCount}</h2>  
                                    project exercises; {props.courseDetails.groupProjectCount}
                                </div>
                            )

                            case "Deeper type usage":
                                return(

                                    <div>
                                    <h2>{props.courseDetails.name}  {props.courseDetails.exerciseCount}</h2>  
                                   <p>{props.courseDetails.description}</p>
                                   submit to: {props.courseDetails.exerciseSubmissionLink}
                                </div>
                                )


                                case "Backend development":

                                return(

                                    <div>
                                    <h2>{props.courseDetails.name}  {props.courseDetails.exerciseCount}</h2>  
                                   <p>{props.courseDetails.description}</p>
                                   required skills: {props.courseDetails.requirements.map(skill => {
                                        return <div key={skill}> {skill} </div>
                                       
                                   })}
                                </div>


                                )
        
        

        default: 
        break;

    }





    return(
<div></div>

    );
}


export default part;