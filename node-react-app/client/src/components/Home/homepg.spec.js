import { render, screen } from '@testing-library/react';
import Home from './index';
describe('clbb', () => {
    it('loads the title club details', () => {
        render(<Home/>);
        expect(screen.queryByText('CLUBHUB')).toBeTruthy();
    });
});