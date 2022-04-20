import { default as Leaderboard } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Leaderboard', () => {

beforeEach(() => {
    render(<Leaderboard/>, { wrapper: MemoryRouter });
})

test('it renders heading', ()=> {
    const paragraph = screen.getByRole('heading');
    expect(paragraph.textContent).toContain('Leaderboard!')
})



})
