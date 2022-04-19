import { default as ProfileButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ProfileButton', () => {
    beforeEach(() => {
        render(<ProfileButton />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('See Your Profile');
    })
})
