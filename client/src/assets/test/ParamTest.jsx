import React from 'react';
import { useParams } from 'react-router-dom';

const ExampleComponent = () => {
  const  param  = useParams();

  return (
    <div>
      <p>Parameter 1: {param}</p>
    </div>
  );
};

export default ExampleComponent;
