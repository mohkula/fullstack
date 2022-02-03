
var timeoutID


const notificationReducer = (state = 'DefaultMessage', action) => {

switch(action.type){

    case 'SET_NOTIFICATION':
       
    state = action.data.message
        return state

        default: return state
}



}

export const setNotification = (message, seconds) => {
 

   


   return async dispatch =>{
       dispatch({type: 'SET_NOTIFICATION',
       data: {message: message}}
       )

     timeoutID =   setTimeout(() => {
        

        latestTimeID === timeoutID ? 
        dispatch({type: 'SET_NOTIFICATION',
        data: {message: ''}})
        :

        clearTimeout(latestTimeID);



   
    
   
     
}, seconds * 1000)
  
const latestTimeID = timeoutID


   

   }

  

}
export default notificationReducer