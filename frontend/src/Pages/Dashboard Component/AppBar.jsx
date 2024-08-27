import React from 'react'

function AppBar() {
    return (
        <>
        <div className='shadow h-14 flex justify-between'>
            <div className='flex flex-col justify-center pl-4'>PayTM Wallet</div>
            <div className='flex'>
            <div className='flex flex-col justify-center pr-4'>Hello</div>
            <div className='flex justify-center h-12 w-12 flex-col bg-slate-200 rounded-full '>
                <div className='flex justify-center'>User</div>
            </div>
            </div>
        </div>
        
        </>
    )
}

export default AppBar