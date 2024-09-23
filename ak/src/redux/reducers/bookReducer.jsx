const initialState={
    items:[],
    availableCount:0,
    borrowedCount:0,
    genreDistribution:{},
}

const bookReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_BOOKS':
            return{...state,items:action.payload}
        case 'UPDATE_BORROWED_COUNT':
            return{...state,borrowedCount:action.payload}
        case 'UPDATE_AVAILABLE_COUNT':
            return{...state,availableCount:action.payload}
        case 'UPDATE_GENRE_DISTRIBUTION':
            return{...state,genreDistribution:action.payload}
        default:
            return state;
    }
}

export default bookReducer