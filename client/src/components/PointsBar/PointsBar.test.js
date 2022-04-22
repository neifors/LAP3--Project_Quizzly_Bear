import { default as PointsBar } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('RootButton', () => {
    beforeEach(() => {
        render(<PointsBar />,  { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Back To Start');
    })
})
