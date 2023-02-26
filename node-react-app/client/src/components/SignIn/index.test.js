import { render, screen } from '@testing-library/react'
import { SignIn } from './index.js'
import { getAuth } from 'firebase/auth'
import { useUser } from '../Firebase/context'
import '@testing-library/jest-dom/extend-expect';


jest.mock('firebase/auth', () => ({ getAuth: jest.fn() }));
jest.mock('../Firebase/context', () => {
    const originalModule = jest.requireActual('../Firebase/context')
    return ({ ...originalModule, useUser: jest.fn() })
});

describe('SignIn', () => {

    it('Displays Log In and Sign Up buttons when not logged in', () => {
        useUser.mockImplementation(() => null)
        getAuth.mockImplementation(() => null)
        render(<SignIn/>);
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('Displays Log Out button when logged in', () => {
        useUser.mockImplementation(() => ({user: {}}))
        render(<SignIn/>);
        expect(screen.getByText('Log Out')).toBeInTheDocument();

    });
})