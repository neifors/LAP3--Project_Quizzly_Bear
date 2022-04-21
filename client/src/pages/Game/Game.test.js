import { default as Game } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Game', () => {

    beforeEach(() => {
        const div = document.createElement('div');
        div.id = 'root'
        window.domNode = div;
        document.body.appendChild(div);
    })

    test('it renders heading', () => {
        render(<Game />, { wrapper: MemoryRouter });
        const paragraph = screen.getByRole('heading');
        expect(paragraph.textContent).toContain(`Welcome to Quizzly Bears' quiz 🐻`)
    })

    test('it renders a form', () => {
        render(<Game />, { wrapper: MemoryRouter });
        const form = screen.getByRole('form')
        expect(form).toBeInTheDocument
    })

})
