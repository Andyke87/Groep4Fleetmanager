import React from 'react';
import PropTypes from 'prop-types';

const Gebruikersnaam = ({ gebruikersnaam, setGebruikersnaam }) => {
  return (
    <div>
      <div className='headerText' />
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
  );
};

Gebruikersnaam.propTypes = {
  gebruikersnaam: PropTypes.string.isRequired,
  setGebruikersnaam: PropTypes.func.isRequired,
};

export default Gebruikersnaam;
