import { render, screen } from '@testing-library/react';
import ExplorePage from "./index"
describe('Explore page', () => {
    it('loads the title MyClubs', () => {
        render(<ExplorePage />);
        expect(screen.queryByText('Filter by category')).toBeTruthy();
    });
});