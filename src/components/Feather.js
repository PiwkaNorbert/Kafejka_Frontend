import React from 'react';
import Logo from './legimi.ico';

const Feather = () => {
  return (
    <img
      src={Logo}
      style={{ width: '24px', height: '24px', filter: 'grayscale(100%)' }}
    />
  );
};

export default Feather;
