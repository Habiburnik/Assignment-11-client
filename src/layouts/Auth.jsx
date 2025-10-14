
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div>
            <nav className='bg-base-200'>
            <Navbar></Navbar>
            </nav>
            <section className='flex bg-[#ede0d4] justify-center items-center min-h-screen '>
                <Outlet></Outlet>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Auth;