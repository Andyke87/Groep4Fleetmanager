import React from 'react'
import './Welkom.css';
import '../Login/Login.css'




const Welkom = () => {
  return (
    
    <div className='containerWelkom'> 
   <div className='containerButtons'> 
    <button className='brightnessButton'></button>
    <button className ='logOutButton'>Log out</button>
     </div>
   
    

     <div className='secondScreenContainer'>
      <h1 className='nameAdress'>Welkom Patrick</h1>
      <button className='button'>Voertuigen</button>
      <button className='button'>Tankkaarten</button>
      <button className='button'>Bestuurders</button>
      <button className='button'>Relaties</button>

     </div>
    </div>
  

  )
}

export default Welkom