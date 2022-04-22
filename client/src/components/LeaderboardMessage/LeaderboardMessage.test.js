import { default as LeaderboardMessage } from '.';
import { screen, render } from '@testing-library/react';

jest.mock('jwt-decode', () => () => ({ username: 'test' }))

describe('LeaderboardMessage', () => {
        let leader = {_id:1, username: 'testPlayer1'}
        let secondPlace = {_id:2, username:'testPlayer2'};
        let thirdPlace = {_id:3, username: 'testPlayer3'}

    beforeEach(() => {
        render(<LeaderboardMessage leader={leader} secondPlace={secondPlace} thirdPlace={thirdPlace}/>);
    })

    test('it renders a paragraph', ()=> {
        const paragraph = screen.getByRole('message');
        expect(paragraph.textContent).toContain('')
    })



})
