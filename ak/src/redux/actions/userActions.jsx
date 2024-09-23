import { db } from '../../Firebase';
import{ref,set} from 'firebase/database'

export const setUser=(user)=>({
    type:'SET_USER',
    payload:user,
});

export const banUser=(userId)=>async(dispatch)=>{
    const userRef=ref(db,`users/${userId}`);
    await update(userRef,{banned:true});
    dispatch({type:'BAN_USER',payload:userId});
}