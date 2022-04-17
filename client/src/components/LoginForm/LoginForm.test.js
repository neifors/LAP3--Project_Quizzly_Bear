import { default as LoginForm } from '.';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
    let getLoginMock;

    beforeEach(() => {
        getLoginMock = jest.fn();
        render(<LoginForm handleSubmit={getLoginMock} />);
    });

    test('it renders a form', () => {
        let form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    });

    test('it calls LoginFunc on form submission', () => {
        let usernameInput = screen.getByLabelText('Username');
        let passwordInput = screen.getByLabelText('Password');
        userEvent.type(usernameInput, "Test")
        userEvent.type(passwordInput, "password{enter}")
        expect(getLoginMock).toHaveBeenNthCalledWith(1, '{username: Test, password: password}');
    })
})
