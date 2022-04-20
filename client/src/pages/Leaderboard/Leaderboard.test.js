import { default as Leaderboard } from '.';
import { screen, render } from '@testing-library/react';

describe('Leaderboard', () => {

beforeEach(() => {
    render(<Leaderboard/>);
})

test('it renders heading', ()=> {
    const paragraph = screen.getByRole('heading');
    expect(paragraph.textContent).toContain('Leaderboard!')
})



})
