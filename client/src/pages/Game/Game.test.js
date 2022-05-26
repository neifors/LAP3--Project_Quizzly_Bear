import { default as Game } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Game', () => {

    beforeEach(() => {
        const div = document.createElement('div');
        div.id = 'root'
        window.domNode = div;
        document.body.appendChild(div);
        render(<Game />, { wrapper: MemoryRouter });
    })

    test('it renders heading', () => {
        const paragraph = screen.getByRole('heading');
        expect(paragraph.textContent).toContain(`Welcome to Quizzly Bears' quiz 🐻`)
    })

    test('it renders a form', () => {
        const form = screen.getByRole('form')
        expect(form).toBeInTheDocument
    })

})


