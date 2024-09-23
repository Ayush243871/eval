import {CreateStore,applyMiddleware,combinedReducers} from 'redux'
import thunk from 'redux-thunk'
import  userReducer from '../redux/reducers/userReducer'
import  bookReducer from  '../redux/reducers/bookReducer'

const rootReducer=combinedReducers({
    user:userReducer,
    books:bookReducer,
})

const store=CreateStore(rootReducer,applyMiddleware(thunk));

export default store