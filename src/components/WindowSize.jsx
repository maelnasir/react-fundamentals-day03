import React from 'react';
import useWindowSize from '../hooks/useWindowSize';

function WindowSize() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window Width: {width}</p>
      <p>Window Height: {height}</p>
    </div>
  );
}

export default WindowSize