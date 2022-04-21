import { default as HomeButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('HomeButton', () => {
    beforeEach(() => {
        render(<HomeButton />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Back to Homepage');
    })
})
