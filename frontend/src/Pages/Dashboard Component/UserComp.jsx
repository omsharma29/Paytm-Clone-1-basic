import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserComp() {
        const [users, setUsers] = useState([]);
        const [filter, setfilter] = useState("")
        useEffect(()=>{
            const fetch = async()=>{
            try {
                const response = await axios.get("http://localhost:3000/api/v1/users/bulk?filter=" + filter) 
                setUsers(response.data.user)
            } catch (error) {
                console.error('Error fetching users:', error);

            }
        }
            fetch()
    
    }, [filter])

     

  return (
    <div className='my-5 px-5'>
        <div className='font-bold text-lg' >
            Users
        </div>
        <div>
            <input onChange={(e)=>{setfilter(e.target.value)}} type="text" placeholder='Search users....' className='w-full my-5 py-2 border rounded border-slate-'/>
        </div>
        <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
       {/* user maping */}
        </div>
    </div>
  )
}

function User({user}){
    const navigate = useNavigate()

    const sendclick = () => {
        // Navigate to the desired route (e.g., /send-money or any other route)
        navigate(`/sendmoney?id=${user._id}&name=${user.firstName}&last=${user.lastName}`, { state: { userId: user._id } });
      };
    return (
    <div className='flex justify-between'>
        <div className="flex">
        <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
            <div className='flex flex-col justify-center h-full text-xl'>
                {user.firstName[0]}
            </div>
        </div>

        <div className='flex flex-col justify-center h-full'>
            <div>
                {user.firstName} {user.lastName}
            </div>
        </div>
        </div>

        <div>
        <button type='submit' onClick={sendclick}  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send</button>
        </div>
    </div>
    )
}

export default UserComp