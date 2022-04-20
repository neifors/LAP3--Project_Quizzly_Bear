import { default as DeleteButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('DeleteButton', () => {
    beforeEach(() => {
        render(<DeleteButton />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Delete Account');
    })
})
