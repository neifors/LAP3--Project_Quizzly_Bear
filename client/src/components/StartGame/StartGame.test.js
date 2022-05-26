import { default as StartGame } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
      __esModule: true,
      ...originalModule,
      useNavigate: jest.fn(),
    };
});


describe('StartGame', () => {
    beforeEach(() => {
        render(<StartGame />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Start A Game');
        userEvent.click(btn)
        expect(useNavigate).toHaveBeenCalled()

    })
})
