import React from 'react'

const handleLogout = () => {
    window.location.href = '/';
}

const LogoutButton = () => {
  return (
    <div><button className ='logOutButton' onClick={handleLogout} >Log out</button></div>
  )
}

export default LogoutButton