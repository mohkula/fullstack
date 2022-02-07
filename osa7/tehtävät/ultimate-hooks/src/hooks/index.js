
import axios from 'axios'
import { useState, useEffect} from 'react'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  

    useEffect(() => {

         axios.get(baseUrl).then(response =>{
            setResources(response.data)
         })

     


    },[baseUrl])
    

      
       
        
    
    
    
   
 



    const create = async(resource) => {

       
        const response = await axios.post(baseUrl, resource)
  return response.data
      
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }

  export default useResource