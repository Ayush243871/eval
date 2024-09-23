const initialState={
    currentUser:null,
    isAdmin:false,
    borrowedBooks:[],
    bannedUsers:[],
}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_USER':
            return{...state,currentUser:action.payload};
        case 'SET_ADMIN':
            return{...state,isAdmin:action.payload};
        case 'UPDATE_BORROWED_BOOKS':
            return{...state,borrowedBooks:action.payload};
        case 'BAN_USER':
            return{...state,bannedUsers:[state.bannedUsers,action.payload]}
        default:
            return state;
    }
};

export default userReducer;