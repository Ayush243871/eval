import { useEffect,useState } from "react";
import { db } from "../Firebase";
import {ref,onValue,set} from 'firebase/database';
import { Book } from "../types";

const BORROW_PERIOD_DAYS=7;

export const useBooks=()=>{
    const [books, setBooks] = useState<Book[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
    const [currentPage,setCurrentPage]=useState<number>(1);
    const booksPerPage=5;

    useEffect(()=>{
        const booksRef=ref(db,'books');
        const unsubscribe=onValue(booksRef,(snapshot)=>{
            const data=snapshot.val();
            const bookList:Book[]=[];
            if(data){
                Object.keys(data).forEach((key)=>{
                    bookList.push({id:key,...data[key]})
                })
            }
            setBooks(bookList);
            setLoading(false);
        })
        return()=>unsubscribe();
    },[])
    const borrowBook =async(bookId:string,userId:string)=>{
        const bookRef=ref(db,`books/${bookId}`);
        const dueDate=new Date(Date.now()+BORROW_PERIOD_DAYS*24*60*60*1000).toISOString();
        await set(bookRef,{...books.find(book=>book.id===bookId),isBorrowed:true, borrowedBy:userId,dueDate});
        setBooks(prevBooks=>prevBooks.map(book=>bookId===bookId?{...book,isBorrowed:true,borrowedBy:userId,dueDate}:book))
    }
    const returnBook=async(bookId:string,userId:string)=>{
        const bookToReturn=books.find(book=>book.id===bookId);
        if(bookToReturn){
            const isOverdue=new Date(bookToReturn.dueDate!)<new Date();
            if(isOverdue){
                alert("This Book is overduew! please pay any penalties.")
            }
        }
        const bookRef=ref(db,`books/${bookId}`);
        await set(bookRef,{...books.find(book=>book.id===bookId),isBorrowed:false,borrowedBy:null,dueDate:null});
     //   setBooks(prevBooks=>prevBooks.map(book=>book.id===bookId ? {...book,isBorrowed:false,borrowedBy:null,dueDate:null}:book));

    };

    const paginatedBooks=()=>{
        const startIndex=(currentPage-1)*booksPerPage;
        return books.slice(startIndex,startIndex+booksPerPage)
    }

    return {books:paginatedBooks(),loading,borrowBook,returnBook,currentPage,setCurrentPage,totalPages:Math.ceil(books.length/booksPerPage)}
}