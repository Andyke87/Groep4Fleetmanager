import React from 'react'

const Gebruikersnaam = () => {
  return (
    <div>
    <div className='headerText'/>
      <div className='text'>Gebruikersnaam</div>
        <div>
            <input
              className="inputGebruikersnaam"
              type="text"
              placeholder='Patrick'
              value={gebruikersnaam}
              onChange={(e) => setGebruikersnaam(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Gebruikersnaam
