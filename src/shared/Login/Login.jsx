import { useState } from "react";
// import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api/api";

const Login = () => {
    // const { signInUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    // Getting the exact path;

    // Handle Login Form
    const handleLoginForm = (e) => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // form validation;
        if (password.length < 6) {
            setError('Length must be 6 character long');
            setLoading(false)
            return
        }
        setError('')

        const userInfo = {
            email,
            password
        }

        // user login
        api.post('/login', userInfo)
            .then(res => {
                if (res.user) {
                    navigate('/dashboard')
                    localStorage.setItem('access-token', res.token)
                    localStorage.setItem('email', res.user.email)
                }
            })
            .catch(err => {
                if (err) {
                    setError('Invalid username/email')
                    return
                }
            })
            .finally(() => {
                setLoading(false)
            })




    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">

                <div className="hero-content flex-col">
                    <div>
                        <h3 className="text-2xl font-bold py-4">Income Insight Software</h3>
                        <hr className="border-2 mb-2" />
                    </div>

                    <div className="card  w-full  shadow-2xl bg-base-100">
                        <div className="text-center py-4 text-lg">
                            <h3>Please, Login to you account</h3>
                        </div>
                        <hr />
                        {/* Error Msg */}
                        <div>
                            {error && <><p className="text-red-500 text-center pt-4">{error}</p> <hr className="mt-4" /></>}
                            {loading && <><p className="text-green-500 text-center pt-4">Logging in.....</p> <hr className="mt-4" /></>}
                        </div>
                        <form className="card-body px-10" onSubmit={handleLoginForm}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered md:w-96" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>

                    {/* <div className="py-5">
                        <h3>Developed by <a href="https://www.linkedin.com/in/minhazulabedinmunna/" className="link-primary underline">Minhazul Abedin Munna</a></h3>
                    </div> */}

                </div>

            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
