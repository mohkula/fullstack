import React from "react";
import { Entry } from "../types";
import HealthRatingBar from "./HealthRatingBar";


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


const entryDetails =(entry: Entry) => {


    switch (entry.type){
    case "HealthCheck":
        
        return(<div>
            {entry.healthCheckRating ? <div> <HealthRatingBar rating={entry.healthCheckRating} showText={false} /> </div> :null }
            
            diagnose by {entry.specialist}

            {entry.discharge ? <div> discharged {entry.discharge.date} Criteria:  {entry.discharge.criteria} </div> : null}

            </div>
               );

case "OccupationalHealthcare" :
     return(<div>
        
        <p>employers name: {entry.employerName}</p>

        {entry.sickLeave ? <div> sickLeave from {entry.sickLeave.startDate} to  {entry.sickLeave.endDate} </div> : null}


    <p>  diagnose by {entry.specialist}</p>


        </div>
           );

default:
    return assertNever(entry);

    }

return (<div>{entry}</div>);
};


export default entryDetails;