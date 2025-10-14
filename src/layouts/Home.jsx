
import Navbar from './../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../components/Footer';
import { useContext } from 'react';
import Loading from './../components/pages/Loading';
import AuthContext from '../provider/AuthContext';

const Home = () => {
    const { loading } = useContext(AuthContext)
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <nav className='fixed z-50 w-full'>
                <Navbar></Navbar>
            </nav>
            <main className=' relative bg-[#ede0d4] z-40 mx-auto min-h-screen'>
                <section>
                    <Outlet></Outlet>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Home;