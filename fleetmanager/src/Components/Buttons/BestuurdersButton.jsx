/* eslint-disable no-unused-vars */
import React from 'react'

const handleBestuurders = () => {
    window.location.href = '/NieuwSchermBestuurders';   
}
const BestuurdersButton = () => {
  return (
    <button  className='buttons'  onClick={handleBestuurders} >Drivers</button>
  )
}

export default BestuurdersButton