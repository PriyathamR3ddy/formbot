import React from 'react';
import PropTypes from 'prop-types';

const EnableVoice = ({ toggleVoice }) => {
  return (
    <a className="button is-success is-large" onClick={() => toggleVoice()}>
      <span className="icon is-medium">
        <i className="fas fa-microphone"></i>
      </span>
    </a>
  );
};

EnableVoice.propTypes = {
  toggleVoice: PropTypes.func.isRequired
};

export default EnableVoice;
