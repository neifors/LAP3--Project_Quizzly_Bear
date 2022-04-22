import { default as ProgressBar } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ProgressBar', () => {
   //  beforeEach(() => {
   //    const wrapper = render(<ProgressBar color={"red"} width={"102%"} value={4} max={20}/>,  { wrapper: MemoryRouter });
   //  })

    test('renders a progress bar', () => {
      const { container } = render(<ProgressBar color={"red"} width={"102%"} value={4} max={20}/>);
      expect(container.firstChild).toBeTruthy();
    })
})
