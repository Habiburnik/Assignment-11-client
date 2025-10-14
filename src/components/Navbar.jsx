import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import AuthContext from '../provider/AuthContext';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const subMenu = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to=''>All Artifacts</Link></li>
        <li><Link to=''>Add Artifactss</Link></li>
        <li>
            <details>
                <summary>My Profile</summary>
                <ul className="p-2 bg-[#9c6644] text-[#ede0d4] w-40">
                    <li><Link to=''> My Artifacts </Link></li>
                    <li><Link to=''> Liked Artifacts </Link></li>
                </ul>
            </details>
        </li>
    </>


    return (
        <div className="navbar bg-[#9c6644] text-[#ede0d4] shadow-sm flex justify-between text-3xl lg:text-2xl">
            <div className="navbar-start max-w-[200px]">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-[#9c6644] text-[#ede0d4] rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {subMenu}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost hover:bg-[#7f5539] text-2xl border-none shadow-none hover:text-[#ede0d4]">
                    <span className='text-lg font-bold'>Ancient Quest</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu  text-lg menu-horizontal px-1">
                    {subMenu}
                </ul>
            </div>
            <div className='flex h-'>
                {
                    user && user?.email ? (
                        <>
                            <div className="flex md:hidden bg-[#e6ccb2] text-[#7f5539]">
                                <button onClick={logOut} className="btn btn-sm ml-3">
                                    Logout <FiLogOut />
                                </button>
                            </div>

                            <div className="hidden md:flex">
                                <ul className="menu menu-horizontal">
                                    <li>
                                        <details>
                                            <summary>{user.displayName}</summary>
                                            <ul className="bg-[#e6ccb2] font-bold rounded-t-none text-[#7f5539]">
                                                <li>
                                                    <button onClick={logOut}>Logout</button>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link to="/auth/login" className="bg-[#e6ccb2] text-[#7f5539] border-none btn h-8 mt-1.5 ml-3">
                            <FiLogIn /> Login
                        </Link>
                    )
                }


            </div>
        </div>
    );
};


export default Navbar;