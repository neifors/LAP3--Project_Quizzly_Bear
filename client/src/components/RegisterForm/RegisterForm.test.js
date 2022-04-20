import { default as LoginForm } from '.';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('LoginForm', () => {

    beforeEach(() => {
        render(<LoginForm />,  { wrapper: MemoryRouter });
    });

    test('it renders a form', () => {
        let form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    });

    test('it listens for changes in inputs', () => {
        let usernameInput = screen.getByLabelText('Username');
        let passwordInput = screen.getByLabelText('Password');
        expect(usernameInput).toBeInTheDocument
        expect(passwordInput).toBeInTheDocument
    })
})
