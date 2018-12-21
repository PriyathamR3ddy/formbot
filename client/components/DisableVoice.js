import React from 'react';
import PropTypes from 'prop-types';

const DisableVoice = ({ toggleVoice }) => {
  return (
    <a className="button is-danger is-large" onClick={() => toggleVoice()}>
      <span className="icon is-medium">
        <i className="fas fa-microphone-slash"></i>
      </span>
    </a>
  );
};

DisableVoice.propTypes = {
  toggleVoice: PropTypes.func.isRequired
};

export default DisableVoice;
