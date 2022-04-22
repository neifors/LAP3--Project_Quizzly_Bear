import { default as Logout } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


describe('Logout', () => {
    beforeEach(() => {
        render(<Logout />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Logout');
    })
})
