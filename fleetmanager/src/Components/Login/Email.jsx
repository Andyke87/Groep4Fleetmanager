/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const Email = ({ email, setEmail }) => {
  return (
    <div>
      <div className='headerTextEmail'>
        <div className='text'>Username</div>
          <div>
            <input
              className="inputEmail"
              type="text"
              placeholder='xxx@allphi.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>
      </div>
    </div>
  );
};

Email.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default Email;