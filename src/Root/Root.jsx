import React from 'react';
import Navbar from '../Layout/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Layout/Footer/Footer';


const Root = () => {
    return (
        <div>
            <div className=''>
                <Navbar></Navbar>
            </div>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;