import React from 'react';
import Navbar from '../Layout/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Layout/Footer/Footer';


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;