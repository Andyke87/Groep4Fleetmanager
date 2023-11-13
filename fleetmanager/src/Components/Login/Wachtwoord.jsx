import React from 'react'

const Wachtwoord = () => {
  return (
    <div>
        <div className='headerText'>
            <div className='text'>Wachtwoord</div>
                <div>
                <input
                className='inputWachtwoord'
                type="password"
                placeholder='Allphi123'
                value={wachtwoord}
                onChange={(e) => setWachtwoord(e.target.value)}
                />
            </div>
        </div>
    </div>
  )
}

export default Wachtwoord
