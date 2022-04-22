import { default as BackButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
      __esModule: true,
      ...originalModule,
      useNavigate: jest.fn(),
    };
  });

describe('BackButton', () => {
    beforeEach(() => {
        render(<BackButton />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Go Back');
    })

})
