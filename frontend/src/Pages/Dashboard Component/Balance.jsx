import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Balance({ token }) { // Ensure token is passed as a prop

  const [value, setValue] = useState(); // Initial state should be a string
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        console.log(response.data.balance);

        // Assuming the response contains the balance in a field called 'balance'
        setValue(response.data.balance);
      } catch (error) {
        setError(error.message);
        console.log('Unable to fetch balance:', error);
      }
    };

    fetchBalance();
  }, []); // Include token as a dependency

  return (
    <div className='flex pl-5 pt-5'>
      <div className='flex flex-col justify-center font-bold text-lg'>Your Balance</div>
      <div className='flex flex-col justify-center font-semibold ml-4 text-lg'>Rs. {value !== null ? value : 'Loading...'}</div>
      <div>
        {error && <div className='flex flex-col justify-center text-red-500 ml-4'>{error}</div>}
      </div>
    </div>
  );
}

export default Balance;
