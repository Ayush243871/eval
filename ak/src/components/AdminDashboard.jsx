import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { banUser } from "../redux/actions/userActions";
import {Pie} from 'react-chartjs2';
import { background } from "@chakra-ui/react";

const AdminDashboard=()=>{
    const users=useSelector(state=>state.user.users)
    const borrowedCount=useSelector(state=>state.books.borrowedCount)
    const availableCount=useSelector(state=>state.books.availableCount)
    const genreDistribution=useSelector(state=>state.books.genreDistribution)
    const dispatch=useDispatch()

    const handleBanUser=(userId)=>{
        dispatch(banUser(userId));
    };

    const availabilityData={
        labels:['Available','Borrowed'],
        datasets:[{
            data:[availableCount,borrowedCount],
            backgroundColor:['#36A2EB','#FF6384']
        }]
    }

    const genreData={
        labels:Object.keys(genreDistribution),
        datasets:[{
            data:Object.values(genreDistribution),
            backgroundColor:['#FF6384','#36A2EB','#FFCE56']
        }]
    }

    return(
        <div>
            <h2>Admin Dashboard</h2>
            <Pie data={availabilityData}/>
            <Pie data={genreData}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={()=>handleBanUser(user.id)}>BAN USER</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>   
         )
}

export default AdminDashboard