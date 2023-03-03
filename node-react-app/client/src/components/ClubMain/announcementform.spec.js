import { render, screen } from '@testing-library/react';
import AnnouncementForm from './AnnouncementForm';
describe('MyClubs', () => {
    it('loads the title MyClubs', () => {
        render(<AnnouncementForm />);
        expect(screen.queryByText('Post New Announcement')).toBeTruthy();
    });
});