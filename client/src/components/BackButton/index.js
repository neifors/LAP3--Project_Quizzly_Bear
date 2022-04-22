import React from 'react';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
      __esModule: true,
      ...originalModule,
      useNavigate: jest.fn(),
    };
  });

const BackButton = () => {

    const goTo = useNavigate();

    return(
        <button onClick={() => goTo(-1)}>Go Back</button>
    )
}

export default BackButton
