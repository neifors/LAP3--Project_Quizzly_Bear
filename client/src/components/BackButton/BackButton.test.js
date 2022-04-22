import { default as BackButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import { DrawerActions } from "@react-navigation/native";


// const mockedDispatch = jest.fn();

// // Mocks like this need to be configured at the top level 
// // of the test file, they can't be setup inside your tests.
// jest.mock("@react-navigation/native", () => {
//   const actualNav = jest.requireActual("@react-navigation/native");
//   return {
//     ...actualNav,
//     useNavigation: () => ({
//       navigate: jest.fn(),
//       dispatch: mockedDispatch,
//     }),
//   };
// });

describe('BackButton', () => {
    beforeEach(() => {
        render(<BackButton />, { wrapper: MemoryRouter });
        mockedDispatch.mockClear();
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Go Back');
    })
})


