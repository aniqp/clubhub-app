import { render, screen } from '@testing-library/react';
import MyClubs from "./index"
describe('MyClubs', () => {
    it('loads the title MyClubs', () => {
        render(<MyClubs />);
        expect(screen.queryByText('My Clubs')).toBeTruthy();
    });
});