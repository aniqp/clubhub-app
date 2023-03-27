import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import AnnouncementPost from "./AnnouncementPost";

describe('Rendering of Announcement Posts', () => {

    let loadAnnouncementPost;

    function renderComponent() {
        loadAnnouncementPost = jest.fn().mockName('loadAnnouncements');

        let announcement={
            id: 1,
            title:'Sample title',
            body:'Sample content',
            visibility: 'public',
            time_posted_text:'Sun March 26 2023 1:44 PM',
            placeholderPhoto: 1,
        }

        render(<AnnouncementPost 
            admin={false}
            announcement={announcement} />
        );    
    }

    it('displays announcement title', () => {
        renderComponent();

        const postTitle = screen.queryByTestId('title-1');
        expect(postTitle).toBeInTheDocument();
        expect(postTitle).toHaveTextContent('Sample title');
    })

    it('displays announcement content', () => {
        renderComponent();

        const postContent = screen.queryByTestId('body-1');
        expect(postContent).toBeInTheDocument();
        expect(postContent).toHaveTextContent('Sample content');
    })

    it('displays timestamp', () => {
        renderComponent();

        const postTime = screen.getByTestId('timestamp-1');
        expect(postTime).toBeInTheDocument();
        expect(postTime).toHaveTextContent('Sun March 26 2023 1:44 PM');
    })

})