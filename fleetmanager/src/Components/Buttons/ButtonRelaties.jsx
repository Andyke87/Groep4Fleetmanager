import React from 'react'

const handleRelaties = () => {
    window.location.href = '/Relaties';
}

const ButtonRelaties = () => {
  return (
   <button  className='buttons' onClick={handleRelaties} >Relaties</button>
  )
}

export default ButtonRelaties