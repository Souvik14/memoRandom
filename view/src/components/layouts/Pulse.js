import React, { Fragment } from 'react';
import pulse from './Pulse-1s-200px.gif';

export default () => (
  <Fragment>
    <img
      src={pulse}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
