import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../assets/icons/user.png";
import Swal from "sweetalert2";

const Header = () => {
    const navigate = useNavigate()

    // HandleLogout;
    const handleLogout = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You need to login again !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {

                localStorage.removeItem('access-token')
                localStorage.removeItem('email')
                Swal.fire(
                    'Logged out!',
                    'Logout Successfull.',
                    'success'
                )
                navigate('/')

                // logOut()
                //     .then(() => {
                //         // Sign-out successful.
                //         Swal.fire(
                //             'Logged out!',
                //             'Logout Successfull.',
                //             'success'
                //         )
                //         localStorage.removeItem('access-token')
                //     }).catch((error) => {
                //         // An error happened.
                //     });
            }
        })



    }

    return (
        <div>
            <div className="navbar bg-slate-600 text-white fixed top-0 z-20 px-6">
                <div className="flex-1">
                    <a className=" normal-case text-xl">Income Insight</a>
                </div>
                <div className="flex-none">

                    <div>
                        {
                            localStorage.getItem('email') ?
                                <>
                                    <button className="btn" onClick={handleLogout}><i className="fa fa-sign-out fa-xl" style={{ color: 'red' }} title="Logout" aria-hidden="true"></i>  </button>
                                </>
                                :
                                <>
                                    <div className="w-10 rounded-full">
                                        <img src={userIcon} />
                                    </div>
                                </>
                        }
                    </div>
                    {/* <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            {
                                user ?
                                    <>
                                        <div>
                                            <h3 className="leading-[1.5]">Hello, Admin</h3>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="w-10 rounded-full">
                                            <img src={userIcon} />
                                        </div>
                                    </>
                            }
                        </label>
                        <ul tabIndex={0} className=" menu  dropdown-content mt-3 z-[1] p-2 shadow bg-slate-700 text-white rounded-box w-52">
                            <li className="hover:bg-slate-400 hover:text-black">
                                <Link to="/"><button onClick={handleLogout}>Logout</button></Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Header;
