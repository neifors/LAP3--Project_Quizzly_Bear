import { default as DeleteButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { deleteUser } from '../../actions'

let username = 'tom'

describe('DeleteButton', () => {
    beforeEach(() => {
        render(<DeleteButton username={username} />);
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Delete Account');
    })

    test('when clicked runs function', () => {
        const btn = screen.getByRole('button')
        userEvent.click(btn)
        expect(deleteUser(username)).toHaveBeenCalled
    })
})
