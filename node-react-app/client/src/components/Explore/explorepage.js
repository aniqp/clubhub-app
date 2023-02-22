import React from 'react';
import { Link } from 'react-router-dom';
//create explore page
const ExplorePage = () => {
    return (
        <div>
        <h1>Explore Page</h1>
        <Link to="/">Home</Link>
        {/* <p>
        <Link to = "club-details">Club Details</Link>
        </p> */}
        </div>
    );
    }
    export default ExplorePage;