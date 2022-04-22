import { default as RegisterForm } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { registerFunction, loginFunction } from '../../actions'
import axios from 'axios'

jest.mock('axios')

describe('RegisterForm', () => {

    beforeEach(() => {
        render(<RegisterForm />,  { wrapper: MemoryRouter });
    });

    test('it renders a form', () => {
        let form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    });

    test('it has username and password inputs', () => {
        let usernameInput = screen.getByLabelText('Username');
        let passwordInput = screen.getByLabelText('Password');
        expect(usernameInput).toBeInTheDocument
        expect(passwordInput).toBeInTheDocument
    })

    test('expect registerFunction to be called on submission', () => {
        let e = { username: 'Test', password: 'password'}
        const submit = screen.getByRole('submit')
        userEvent.click(submit)
        expect(registerFunction(e)).toHaveBeenCalled
        expect(loginFunction(e)).toHaveBeenCalled
    })

    test('already have an account msg displayed', () => {
        const msg = screen.getAllByRole('msg')
        expect(msg).toBeInTheDocument

    })

})
