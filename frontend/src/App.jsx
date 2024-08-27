import Auth from "./authentication/Auth"
import Dashboard from "./Pages/Dashboard"
import SendMoney from "./Pages/SendMoney"
import SignIn from "./Pages/SignIn"
import Signup from "./Pages/Signup"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function App() {
  const token = localStorage.getItem('token');

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/dashboard'element={<Dashboard token={token}/>}/>
    <Route path='/signin'element={<SignIn/>}/>
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/sendmoney'element={<SendMoney/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
