import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogins from './../SocialLogins';
import AuthContext from '../../provider/AuthContext';

const Login = () => {
    const { userLogin, setUser }= useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate(); 

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value

        userLogin(email, password)
        .then(result => {
            const user = result.user
            setUser(user);
            navigate(location?.state ? location.state : "/" )
        })
        .catch(error => {
            alert(error.code)
        })

    }
    return (

        <div className="card font-bold bg-[#e6ccb2] text-[#7f5539] w-full max-w-sm shrink-0 shadow-2xl">
            
            <div className="card-body">
                <form onSubmit={handleLogin} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" name="email" className="input text-[#ede0d4] font-bold bg-[#9c6644] text " placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" name = "password" className="input text-[#ede0d4] font-bold bg-[#9c6644]" placeholder="Password" />
                    <div><Link to='/auth/forget-password' className="link link-hover">Forgot password?</Link></div>
                    <button className="btn bg-[#432818] btn-neutral text-[#ede0d4] border-none mt-4">Login</button>
                    <label className='py-2'> Don't have an account? <Link to='/auth/register' className='text-red-400 font-bold'>Register</Link></label>
                </form>
            </div>
            <SocialLogins></SocialLogins>
        </div>
    );
};

export default Login;