import Part from './Part'



const content = (props: { courseParts: any[]; }) =>{
    
return(

    <div>


        
        {props.courseParts.map(x => {
       return <Part courseDetails={x} key={x.name}/>
            
           
    })}</div>
)

}


export default content;