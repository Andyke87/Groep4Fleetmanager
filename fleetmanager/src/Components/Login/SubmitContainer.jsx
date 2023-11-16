import React from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';

const SubmitContainer = ({ action, handleLogin }) => {
const SubmitContainer = ({ action, handleLogin }) => {
  return (
    <div>
      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>
          {action}
        </button>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>
          {action}
        </button>
      </div>
    </div>
  );
};

SubmitContainer.propTypes = {
  action: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default SubmitContainer;

export default SubmitContainer;