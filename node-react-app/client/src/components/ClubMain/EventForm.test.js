import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import EventForm from "./EventForm";

describe('Event Form', () => {

    function renderComponent() {
        render(<EventForm />);
    }
    
    it('loads the "Create Event" title', () => {
        renderComponent();
        const formTitle = screen.getByTestId('event-form-title');
        expect(formTitle).toBeInTheDocument();
        expect(formTitle).toHaveTextContent('Create Event');
    });

    it('loads the title input box', () => {
        renderComponent();
        const titleInput = screen.getByTestId('title-input');
        expect(titleInput).toBeInTheDocument();
    });

    it('loads the body input box', () => {
        renderComponent();
        const bodyInput = screen.getByTestId('body-input');
        expect(bodyInput).toBeInTheDocument();
    });


})
