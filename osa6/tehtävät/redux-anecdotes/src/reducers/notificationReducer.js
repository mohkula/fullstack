
const notificationReducer = (state = 'DefaultMessage', action) => {

switch(action.type){

    case 'SET_NOTIFICATION':

    state = action.data.message
        return state

        default: return state
}



}

export const setNotification = (message) => {


    return {type: 'SET_NOTIFICATION',
data: {message: message}}
}

export default notificationReducer