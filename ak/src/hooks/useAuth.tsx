import { useState,useEffect } from "react";
import {auth} from '../Firebase';
import { onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { AuthContextType , User} from '../types';

export const useAuth=():AuthContextType=>{
     
    const [user,setUser]=useState<User | null>(null);
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser({uid:user.uid,email:user.email!,borrowedBooks:[]})
            }else{
                setUser(null)
            }
        })
        return ()=> unsubscribe();
    },[])

    const login=async (email:string,password:string)=>{
        await signInWithEmailAndPassword(auth,email,password)
    }
    const logout=async ()=>{
        await signOut(auth);
    }

    const register = async (email:string,password:string)=>{
        await createUserWithEmailAndPassword(auth,email,password);
    }
    return {user,login,logout,register}
}