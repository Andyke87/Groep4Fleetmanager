/* eslint-disable no-unused-vars */
import React from 'react'

const ButtonClearInput = () => {
    // voeg hier de logica toe om de pagina te refreshen
    const refreshPage = () => {
        window.location.reload();
    }    
  return (
    <div>
        <button 
          type="buttonsActions" 
          onClick={refreshPage} 
          className="buttonsActions"
        >Clear input</button>
    </div>
  )
}

export default ButtonClearInput