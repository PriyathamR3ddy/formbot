import React from 'react';

const Transcript = ({ statements }) => {
  return (
    <div className="content">
      <h4 className="subtitle has-text-centered">Transcript</h4>
      <ul>
        {statements.map((statement, index) => <li key={index}>{statement}</li>)}
      </ul>
    </div>
  );
};

export default Transcript;
