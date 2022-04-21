import { default as Game } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Game', () => {

beforeEach(() => {
    render(<Game/>, { wrapper: MemoryRouter });
})

test('it renders heading', ()=> {
    const paragraph = screen.getByRole('heading');
    expect(paragraph.textContent).toContain('Welcome to Quizzly Bears🐻')
})

})
