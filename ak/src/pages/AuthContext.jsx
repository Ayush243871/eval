import React,{createContext,useState,useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebaseConfig'


export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
   
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(firebaseUser)=>{
            if(firebaseUser){
                setUser({
                    uid:firebaseUser.uid,
                    email:firebaseUser.email,
                    isAdmin:firebaseUser.email==='admin@example.com',
                });
            }else{
                setUser(null);
            }
        })
        return()=>unsubscribe()
;},[]);
        return(
            <AuthContext.Provider value={{user}}>
                {children}
            </AuthContext.Provider>
        )
}
