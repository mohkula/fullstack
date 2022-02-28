
interface headerName {
    name: string;
  }

const header = (props: headerName ) =>{

    return (

        <div>

 <h1>{props.name}</h1>

        </div>
    )

}


export default header;