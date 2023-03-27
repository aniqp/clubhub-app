import { render, screen } from '@testing-library/react';
import Home from './index'

describe('Home', () => {
    it('loads the text University of Waterloo', () => {
        render(<Home />);
        expect(screen.queryByText('University of Waterloo')).toBeTruthy();
    });
});
