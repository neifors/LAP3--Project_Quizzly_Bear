import { default as LoginForm } from '.';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { loginFunction } from '../../actions'
import axios from 'axios'

jest.mock('axios', () => {
    return {
        post: jest.fn(() => Promise.resolve({ data: {} })),
      };
});

describe('LoginForm', () => {
    let getLoginMock;

    beforeEach(() => {
        getLoginMock = jest.fn();
        render(<LoginForm onSubmit={getLoginMock}/>, { wrapper: MemoryRouter });
    });

    test('it renders a form', () => {
        let form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    });

    test('it calls LoginFunc on form submission', () => {
        let usernameInput = screen.getByLabelText('Username');
        let passwordInput = screen.getByLabelText('Password');
        expect(usernameInput).toBeInTheDocument
        expect(passwordInput).toBeInTheDocument
    })

    test("clears user input after submission", () => {
        const nameInput = screen.getByLabelText('Username')
        userEvent.type(nameInput, "Tom{enter}")
        expect(nameInput.value).toBe("");
      });

    test('expect getlogin to be called on submission',async () => {
        let e = { target: {username: 'Test', password: 'password'}}
        const submit = screen.getByRole('submit')
        userEvent.click(submit)
        axios.post.mockImplementation(Promise.resolve(e.target));
        await loginFunction(e)
        expect(axios.post).toHaveBeenCalled
    })

})
