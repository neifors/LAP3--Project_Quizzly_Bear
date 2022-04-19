import { default as StartGame } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('StartGame', () => {
    beforeEach(() => {
        render(<StartGame />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Start A Game');
    })
})
