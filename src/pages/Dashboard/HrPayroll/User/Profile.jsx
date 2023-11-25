import React, { useEffect, useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import secureApi from '../../../../api/secureApi';
import ProcessSalaryInfo from './ProcessedSalaryInfo/ProcessSalaryInfo';
import AssignedWorks from './AssignedWorks/AssignedWorks';

const Profile = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [assignedworks, setAssignedworks] = useState([])
    const [incomeList, setIncomeList] = useState([])
    const [attendance, setAttendance] = useState([])
    const useremail = localStorage.getItem('email')

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString(); // Adding 1 because months are zero-indexed
    const currentYear = currentDate.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getData = async () => {
        try {
            const res = await secureApi.get(`/individual-profile?year=${selectedYear}&month=${selectedMonth}&email=${useremail}`);
            setSalaries(res.salary);
            // console.log(res)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getUser = async () => {
        try {
            const response = await secureApi.get('/user');
            const user = response.find((u) => u.email === useremail);
            if (user) {
                // console.log(user.name)
                setUsername(user.name);
                try {
                    const res = await secureApi.get(`/assigned-works?year=${selectedYear}&month=${selectedMonth}&person=${user.name}&email=${useremail}`);
                    // console.log(res)
                    setAssignedworks(res.assigned_works);
                    setIncomeList(res.marketing_income);
                    setAttendance(res.person_attendance);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get assigned works, income, and attendance
    const getAllWorks = async () => {
        
    };

    useEffect(() => {
        getUser();
        getData();
        getAllWorks();
    }, [selectedMonth, selectedYear, useremail, username]);

    return (
        <div>
            <PageHeading title={`Summary`} />
            {/* Your form code */}
            <div>
                <form>
                    <div className="flex mt-3 space-x-4 justify-center items-center">
                        {/* Dropdown for 12 months */}
                        <select
                            className="block appearance-none w-32 bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map((month, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        {/* Dropdown for current year */}
                        <select
                            className="block appearance-none w-32 bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value={currentYear}>
                                {currentYear}
                            </option>
                            <option value={currentYear - 1}>
                                {currentYear - 1}
                            </option>

                        </select>

                    </div>
                </form>

            </div>
            <hr className='my-2' />

            <div>
                <ProcessSalaryInfo
                    loading={loading}
                    salaries={salaries}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                />
            </div>

            <div>

                <AssignedWorks
                    assigned_works={assignedworks}
                    attendance={attendance}
                    incomeList={incomeList}
                    loading={loading}
                />

            </div>
        </div>
    );
}

export default Profile;
