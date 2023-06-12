import LogoutModal from "./components/LogoutModal";
// import { useState } from "react";

const CustomerPage = () => {
  const userInfo = localStorage.getItem('userInfo');
  const token = localStorage.getItem('token');

  return (
    <div>
        <h1>Customer Panel</h1>
        <h1>user: {userInfo +" - "+token}</h1>
        <LogoutModal token={token}  />

        
    </div>
  )
}

export default CustomerPage