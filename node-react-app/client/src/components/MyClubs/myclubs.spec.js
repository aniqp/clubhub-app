import { render } from '@testing-library/react';
import MyClubs from "./index"
describe('MyClubs', () => {
    it('loads MyClubs on first render', () => {
        const loadMyClubs = jest.fn().mockName('loadMyClubs');
        render(<MyClubs loadMyClubs={loadMyClubs} />);
        expect(loadMyClubs).toHaveBeenCalled();
    });
});