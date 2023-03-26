import { render, screen } from '@testing-library/react';
import AnnouncementForm from './AnnouncementForm';
describe('AnnouncementForm', () => {
    it('loads the "Post new announcement" message in the announcement form', () => {
        render(<AnnouncementForm />);
        expect(screen.queryByText('Post Announcement')).toBeTruthy();
    });
});