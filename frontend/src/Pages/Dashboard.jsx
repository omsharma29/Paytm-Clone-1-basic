import React from 'react'
import AppBar from './Dashboard Component/AppBar'
import Balance from './Dashboard Component/Balance'
import UserComp from './Dashboard Component/UserComp'

function Dashboard({ token }) {
  return (
    <>
      <AppBar />
      <Balance token={token}
      


      />
      <UserComp />
    </>
  )
}

export default Dashboard