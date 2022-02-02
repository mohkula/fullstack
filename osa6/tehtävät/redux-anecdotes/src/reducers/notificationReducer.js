
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

       setTimeout(() => {
    
  dispatch({type: 'SET_NOTIFICATION',
data: {message: ''}})
    }, seconds * 1000)

   }

  

    return 
}
export default notificationReducer