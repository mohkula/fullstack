

const filterReducer = (state = 'ALL', action) =>{

switch(action.type){
    case 'CHANGE_FILTER':
        
        state = action.data.filterValue
        return state

    default: return state
}





}


export const setFilter = (filter) =>{
    

    return {type: 'CHANGE_FILTER',
    data: {filterValue: filter}
    
    }
}






export default filterReducer