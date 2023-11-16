import React from 'react';
import PropTypes from 'prop-types';

const Wachtwoord = ({ wachtwoord, setWachtwoord }) => {
  return (
    <div>
      <div className='headerTextWachtwoord'>
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
  );
};

Wachtwoord.propTypes = {
  wachtwoord: PropTypes.string.isRequired,
  setWachtwoord: PropTypes.func.isRequired,
};

export default Wachtwoord;