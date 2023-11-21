/* eslint-disable no-unused-vars */
import React from 'react'

const handleConnecties = () => {
    window.location.href = '/Relaties';
    }

const ConnectiesButton = () => {
  return (
    <button  className='buttons'  onClick={handleConnecties} >Connections</button>
  )
}

export default ConnectiesButton