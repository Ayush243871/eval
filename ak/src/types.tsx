export interface Book{
    id:string;
    title:string;
    cover:string;
    author:string;
    genre:string;
    description:string;
    publicationDate:string;
    isBorrowed:boolean;
    borrowedBy?:string;
    dueDate?:string;
}

export interface User{
    uid:string;
    email:string;
    borrowedBooks:string[];
}
export interface AuthContextType{
    user:User| null;
    login:(email:string,password:string)=>Promise<void>
    logout:()=>Promise<void>
    register:(email:string,password:string)=>Promise<void>
}