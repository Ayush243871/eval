import { db } from '../../Firebase';
import{ref,get,update} from 'firebase/database'

export const fetchBooks=()=>async(dispatch)=>{
    const booksRef=ref(db,'books');
    const snapshot=await get(booksRef);
    const booksList=snapshot.val()?Object.keys(snapshot.val()).map(key=>({
        id:key,
        ...snapshot.val()[key],
    })):[];
    dispatch({type:'SET_BOOKS',payload:booksList});
}
export const borrowBook=(bookId,userId)=>async (dispatch,getState)=>{
    const book=getState().books.items.find(b=>b.id===bookId);
    if(book.isBorrowed) return;

    const borrowedBooks=getState().user.borrowedBooks;
    if(borrowedBooks.length>=3){
        alert('You can only  borrow up to 3 books at a time.');
        return

    }
    const updatedBook={...book,isBorrowed:true};
    await update(ref(db,`books/${bookId}`),updatedBook);

    const newBorrowedBooks=[...borrowedBooks,bookId];
    dispatch({type:'UPDATE_BORROWED_BOOKS',payload:newBorrowedBooks})
}

export const returnBook =(bookId)=>async (dispatch,getState)=>{
    const book=getState().books.items.find(b=>b.id===bookId);
    if(!book.isBorrowed) return;

    const updatedBook={...book,isBorrowed:false};
    await update(ref(db,`books/${bookId}`),updatedBook);

    const borrowedBooks=getState().user.borrowedBooks.filter(b=>b!==bookId);
    dispatch({type:'UPDATE_BORROWED_BOOKS',payload:borrowedBooks});


}

