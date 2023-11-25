import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import { FaChevronDown } from 'react-icons/fa';
import useUserAuthHook from '../../hooks/useUserAuthHook.jsx';

const Dashboard = () => {
    const { user, userLoading } = useUserAuthHook();
    // console.log(user)
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col md:mt-16 ">
                    {/* Page content here */}
                    <div className="py-20 md:py-4 px-2">
                        <Outlet />
                        <ScrollRestoration />
                    </div>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button absolute top-20 right-2 lg:hidden"><i className="fa-solid fa-bars"></i></label>

                </div>

                <div className="drawer-side md:mt-16 ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="mt-16 md:mt-0 p-4 w-80 min-h-full sidebarbg border-r-2">
                        {/* Sidebar content here */}


                        {
                            userLoading ?

                                <>
                                    {/* <h3 className="text-center py-4">Loading....</h3> */}
                                </>
                                :
                                <>


                                    {
                                        user.roles == 'admin' ?
                                            <>

                                                <li className="py-2 mb-3"><Link className="flex gap-2">
                                                    <div className="flex justify-center items-center gap-2 ml-4">
                                                        <div><i className="fa-solid fa-gauge fa-xl"></i> </div>
                                                        <div>Dashboard</div>
                                                    </div>
                                                </Link></li>

                                                <div className="collapse dropdwndetails">
                                                    <input type="checkbox" className="peer" />
                                                    <div className="collapse-title">
                                                        <p className="flex justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-address-book fa-xl"></i> Accounting</span> <FaChevronDown /></p>
                                                    </div>
                                                    <div className="collapse-content ml-6">
                                                        <ul className="space-y-3 ullist">
                                                            <li><Link to="/dashboard/add-income">Add Income</Link></li>
                                                            <li><Link to="/dashboard/add-expenses">Add Expenses</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>


                                                {/* HR Activity */}
                                                <div className="collapse dropdwndetails">
                                                    <input type="checkbox" className="peer" />
                                                    <div className="collapse-title">
                                                        <p className="flex justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-user-tie fa-xl"></i> HR & Payroll</span> <FaChevronDown /></p>
                                                    </div>
                                                    <div className="collapse-content ml-6">
                                                        <ul className="space-y-3 ullist">
                                                            <li><Link to="/dashboard/salary-setup">Setup Salary</Link></li>
                                                            {/* <li><Link to="/dashboard/workingday-setup">Setup Working day's</Link></li> */}
                                                            <li><Link to="/dashboard/attendance-process">Attendance Process</Link></li>
                                                            <li><Link to="/dashboard/view-attendance">View Attendance</Link></li>
                                                            <li><Link to="/dashboard/salary-process">Salary Process</Link></li>
                                                            <li><Link to="/dashboard/view-salary-process">View Final Salary</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>


                                                {/* <hr className="border-opacity-50 border-black mb-2" /> */}
                                                {/* <li className="py-2"><Link to={`/dashboard/company-progress`} className="flex gap-2"><i className="fa-solid fa-bars-progress fa-xl"></i> Company Progress</Link></li>
                                                <hr className="border-opacity-50 border-black mb-2" /> */}

                                                <div className="collapse dropdwndetails">
                                                    <input type="checkbox" className="peer" />
                                                    <div className="collapse-title">
                                                        <p className="flex justify-between"><span className="flex items-center gap-2"><i className="fa-regular fa-building fa-xl"></i> Company Setup</span> <FaChevronDown /></p>
                                                    </div>
                                                    <div className="collapse-content ml-6">
                                                        <ul className="space-y-3 ullist">
                                                            <li><Link to="/dashboard/company-setup">Company Information</Link></li>
                                                            <li><Link to="/dashboard/services">Service</Link></li>
                                                            <li><Link to="/dashboard/marketing-persons">Team</Link></li>
                                                            <li><Link to="/dashboard/payment-method">Payment Method</Link></li>
                                                            <li><Link to="/dashboard/reason">Reason</Link></li>
                                                            <li><Link to="/dashboard/who">Who</Link></li>
                                                            <li><Link to={`/dashboard/reset-user`}><span>Admin Activity</span></Link></li>


                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* <hr className="border-opacity-50 border-black mb-2" /> */}



                                                {/* <hr className="border-opacity-50 border-black mb-2" /> */}

                                                <div className="collapse dropdwndetails">
                                                    <input type="checkbox" className="peer" />
                                                    <div className="collapse-title ">
                                                        <p className="flex justify-between"><span className="flex items-center gap-2"> <i className="fa-solid fa-file fa-xl"></i> Report</span> <FaChevronDown /></p>
                                                    </div>
                                                    <div className="collapse-content ml-6">
                                                        <ul className="space-y-3 ullist">
                                                            <li><Link to="/dashboard/income-report">Income Report</Link></li>
                                                            <li><Link to="/dashboard/due-list">Due List</Link></li>
                                                            <li><Link to="/dashboard/expense-report">Expenses Report</Link></li>
                                                            <li><Link to="/dashboard/customer-list">Customer List</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* <hr className="border-opacity-50 border-black mb-2" /> */}

                                                {/* <li className="py-2">
                                                    <Link to={`/dashboard/reset-user`} className=" gap-4 ml-4"><i className="fa-solid fa-window-restore fa-xl"></i> <span>Admin Activity</span></Link></li>
 */}
                                                <li className="py-2 mb-3"><Link to={`/dashboard/profile`} className="flex gap-2">
                                                    <div className="flex justify-center items-center gap-2 ml-4">
                                                        <div><i className="fa-solid fa-gauge fa-xl"></i> </div>
                                                        <div>My Profile</div>
                                                    </div>
                                                </Link></li>

                                            </>
                                            :
                                            <>
                                                {
                                                    user.roles == 'subadmin' ?
                                                        <>


                                                            <li className="py-2 mb-3"><Link className="flex gap-2">
                                                                <div className="flex justify-center items-center gap-2 ml-4">
                                                                    <div><i className="fa-solid fa-gauge fa-xl"></i> </div>
                                                                    <div>Dashboard</div>
                                                                </div>
                                                            </Link></li>


                                                            <div className="collapse dropdwndetails">
                                                                <input type="checkbox" className="peer" />
                                                                <div className="collapse-title">
                                                                    <p className="flex justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-address-book fa-xl"></i> Accounting</span> <FaChevronDown /></p>
                                                                </div>
                                                                <div className="collapse-content ml-6">
                                                                    <ul className="space-y-3 ullist">
                                                                        <li><Link to="/dashboard/add-income">Add Income</Link></li>
                                                                        <li><Link to="/dashboard/add-expenses">Add Expenses</Link></li>
                                                                    </ul>
                                                                </div>
                                                            </div>


                                                            {/* HR Activity */}
                                                            <div className="collapse dropdwndetails">
                                                                <input type="checkbox" className="peer" />
                                                                <div className="collapse-title">
                                                                    <p className="flex justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-user-tie fa-xl"></i> HR & Payroll</span> <FaChevronDown /></p>
                                                                </div>
                                                                <div className="collapse-content ml-6">
                                                                    <ul className="space-y-3 ullist">
                                                                        {/* <li><Link to="/dashboard/salary-setup">Setup Salary</Link></li> */}
                                                                        {/* <li><Link to="/dashboard/workingday-setup">Setup Working day's</Link></li> */}
                                                                        <li><Link to="/dashboard/attendance-process">Attendance Process</Link></li>
                                                                        <li><Link to="/dashboard/view-attendance">View Attendance</Link></li>
                                                                        <li><Link to="/dashboard/salary-process">Salary Process</Link></li>
                                                                        {/* <li><Link to="/dashboard/view-salary-process">View Final Salary</Link></li> */}
                                                                    </ul>
                                                                </div>
                                                            </div>



                                                            {/* <hr className="border-opacity-50 border-black mb-2" /> */}

                                                            <div className="collapse dropdwndetails">
                                                                <input type="checkbox" className="peer" />
                                                                <div className="collapse-title ">
                                                                    <p className="flex justify-between"><span className="flex items-center gap-2"> <i className="fa-solid fa-file fa-xl"></i> Report</span> <FaChevronDown /></p>
                                                                </div>
                                                                <div className="collapse-content ml-6">
                                                                    <ul className="space-y-3 ullist">
                                                                        <li><Link to="/dashboard/income-report">Income Report</Link></li>
                                                                        <li><Link to="/dashboard/due-list">Due List</Link></li>
                                                                        <li><Link to="/dashboard/expense-report">Expenses Report</Link></li>
                                                                        <li><Link to="/dashboard/customer-list">Customer List</Link></li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div className="collapse dropdwndetails">
                                                                <input type="checkbox" className="peer" />
                                                                <div className="collapse-title">
                                                                    <p className="flex justify-between"><span className="flex items-center gap-2"><i className="fa-regular fa-building fa-xl"></i> Company Setup</span> <FaChevronDown /></p>
                                                                </div>
                                                                <div className="collapse-content ml-6">
                                                                    <ul className="space-y-3 ullist">
                                                                        <li><Link to="/dashboard/company-setup">Company Information</Link></li>
                                                                        <li><Link to="/dashboard/services">Service</Link></li>
                                                                        <li><Link to="/dashboard/marketing-persons">Team</Link></li>
                                                                        <li><Link to="/dashboard/payment-method">Payment Method</Link></li>
                                                                        <li><Link to="/dashboard/reason">Reason</Link></li>
                                                                        <li><Link to="/dashboard/who">Who</Link></li>
                                                                        {/* <li><Link to={`/dashboard/reset-user`}><span>Admin Activity</span></Link></li> */}
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <li className="py-2 mb-3"><Link to={`/dashboard/profile`} className="flex gap-2">
                                                                <div className="flex justify-center items-center gap-2 ml-4">
                                                                    <div><i className="fa-solid fa-gauge fa-xl"></i> </div>
                                                                    <div>My Profile</div>
                                                                </div>
                                                            </Link></li>


                                                        </>
                                                        :
                                                        <>
                                                            {
                                                                user.roles == 'user' ?
                                                                    <>
                                                                        <li className="py-2 mb-3"><Link to="/dashboard/profile" className="flex gap-2">
                                                                            <div className="flex justify-center items-center gap-2 ml-4">
                                                                                <div><i className="fa-solid fa-gauge fa-xl"></i> </div>
                                                                                <div>Profile</div>
                                                                            </div>
                                                                        </Link></li>
                                                                    </>
                                                                    :
                                                                    <></>
                                                            }
                                                        </>
                                                }
                                            </>
                                    }
                                </>
                        }
                    </ul>
                </div>
            </div>


        </div>
    );
}

export default Dashboard;
