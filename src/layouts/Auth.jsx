
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div>
            <nav className='bg-base-200'>
            <Navbar></Navbar>
            </nav>
            <section className='flex justify-center items-center min-h-screen '>
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default Auth;