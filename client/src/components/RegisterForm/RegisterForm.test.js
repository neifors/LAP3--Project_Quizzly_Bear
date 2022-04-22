import { default as LoginForm } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { registerFunction } from '../../actions'
import axios from 'axios'

jest.mock('axios', () => {
    return {
        post: jest.fn(() => Promise.resolve({ data: {} })),
      };
});


describe('LoginForm', () => {

    beforeEach(() => {
        render(<LoginForm />,  { wrapper: MemoryRouter });
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

    test('expect registerFunction to be called on submission', async() => {
        let e = { target: {username: 'Test', password: 'password'}}
        const submit = screen.getByRole('submit')
        userEvent.click(submit)
        axios.post.mockImplementation(Promise.resolve(e.target));
        await registerFunction(e)
        expect(axios.post).toHaveBeenCalled
    })

})
