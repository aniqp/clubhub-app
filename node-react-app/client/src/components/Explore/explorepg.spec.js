import { render, screen } from '@testing-library/react';
import ExplorePage from "./index"
describe('Explore page', () => {
    it('loads the text Filter by category in the filter box', () => {
        render(<ExplorePage />);
        expect(screen.queryByText('Filter by category')).toBeTruthy();
    });
});