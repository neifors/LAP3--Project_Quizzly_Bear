import { default as LeaderboardButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('LeaderboardButton', () => {
    beforeEach(() => {
        render(<LeaderboardButton />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('See Leaderboard');
    })
})
