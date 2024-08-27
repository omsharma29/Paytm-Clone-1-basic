import axios from 'axios'
import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';



export default function SignIn() {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const navigate = useNavigate()

    const OnSubmit = async (data)=> {
        try {
            const SignInresponse = await axios.post("http://localhost:3000/api/v1/users/signin", {
                username : data.username,
                password : data.password
            })
            console.log('SignIn Response:', SignInresponse.data.token);
            localStorage.setItem('token', SignInresponse.data.token)
            navigate('/dashboard')
        } catch (error) {
            console.error("There was an error signing up:", error);

        }
    }

    return (
        <>
          <div className=' bg-gray-700 flex items-center justify-center h-screen'>
            <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
              <div className='font-bold text-4xl pt-4 flex items-center justify-center'>SignIn</div>
              <form onSubmit={handleSubmit(OnSubmit)}>
                <label htmlFor="" className='flex flex-col'>Username
                <input type="email" id='username' {...register("username", { required: "Username is requried" })} placeholder='Email' className='pt-3 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                {errors.username && <p className="text-red-500 text-sm mt-1">This Field is Requried</p>}

                </label>
                <label htmlFor="" className='flex flex-col pt-7 pb-4'>Password
                <input type="text" id='password' {...register("password", {minLength:8}, { required: "Password is requried" })} placeholder='Password' className='pt-3 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                {errors.password && <p className="text-red-500 text-sm mt-1">This Field is Requried, min 8 characters</p>}
                </label>
                <button type='submit' className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">SignIn</button>
              </form>
            </div>
          </div>
        </>
      )
    }
