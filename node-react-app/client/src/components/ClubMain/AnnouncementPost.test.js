import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import AnnouncementPost from "./AnnouncementPost";

describe('Rendering of Announcement Posts', () => {

    let loadAnnouncementPost;

    function renderComponent() {
        loadAnnouncementPost = jest.fn().mockName('loadRestaurants');

        render(<AnnouncementPost 
            id={1} 
            name='Test Club' 
            title='This is a test to see if post shows' 
            body='Sample content' 
            timestamp='2023-2-23 13:44:17' 
            onChange='' 
            adminStatus='false' />
        );    
    }
    
    it('displays club name', () => {
        renderComponent();

        const clubName = screen.getByTestId('name-1');
        expect(clubName).toBeInTheDocument();
        expect(clubName).toHaveTextContent('Test Club');
    })

    it('displays announcement title', () => {
        renderComponent();

        const postTitle = screen.getByTestId('title-1');
        expect(postTitle).toBeInTheDocument();
        expect(postTitle).toHaveTextContent('This is a test to see if post shows');
    })

    it('displays announcement content', () => {
        renderComponent();

        const postContent = screen.getByTestId('body-1');
        expect(postContent).toBeInTheDocument();
        expect(postContent).toHaveTextContent('Sample content');
    })

    it('displays correct timestamp', () => {
        renderComponent();

        const postTime = screen.getByTestId('timestamp-1');
        expect(postTime).toBeInTheDocument();
        expect(postTime).toHaveTextContent('1:44 PM');
    })

})
