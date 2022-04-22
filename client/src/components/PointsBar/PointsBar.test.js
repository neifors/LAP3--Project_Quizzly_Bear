import { default as PointsBar } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('PointsBar', () => {
    beforeEach(() => {
        render(<PointsBar bgcolor={"red"} progress={"50"}  height={50}/>,  { wrapper: MemoryRouter });
    })

    test('renders a level progress bar', () => {
        const progressBar = screen.getByRole('level-progress-bar')
        expect(progressBar.textContent).toEqual('50%');
        expect(progressBar).toHaveStyle("backgroundColor:red;")
    })
})
