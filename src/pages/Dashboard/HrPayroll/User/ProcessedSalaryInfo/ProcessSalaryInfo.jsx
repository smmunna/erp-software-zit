import React from 'react';

const ProcessSalaryInfo = ({ loading, salaries, selectedMonth,selectedYear }) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // console.log(salaries)
    return (
        <div>
            {
                loading ?
                    <>
                        <h3 className='text-center text-green-600 my-2'>Loading....</h3>
                    </>
                    :
                    <>
                        {
                            salaries.length > 0 ?
                                <>
                                    <div className='flex justify-center'>
                                        <div>
                                            {
                                                salaries.map((user, index) => <React.Fragment key={index + 1}>
                                                    <div className="card  w-96 md:w-[500px] glass">
                                                        <div className="card-body">
                                                            <h2 className="card-title text-2xl">Hello, {user?.name}</h2>
                                                            <hr className='my-2' />
                                                            <p className='bg-slate-100 shadow-sm p-2'><span className='font-medium'>Final Salary:</span> <span className='text-xl'>{parseFloat(user?.final_salary).toLocaleString()} Tk.</span></p>
                                                            <p className='bg-slate-100 shadow-sm p-2'><span className='font-medium'>Attendance:</span> {user?.total_attendance} day's</p>
                                                            <p className='bg-slate-100 shadow-sm p-2'><span className='font-medium'>Advance:</span> {parseFloat(user?.advance).toLocaleString()} Tk.</p>
                                                            <p className='bg-slate-100 shadow-sm p-2'><span className='font-medium'>Tea:</span> {parseFloat(user?.ta).toLocaleString()} Tk.</p>
                                                            <p className='bg-slate-100 shadow-sm p-2'><span className='font-medium'>Bonus:</span> {parseFloat(user?.bonus).toLocaleString()} Tk.</p>
                                                            <p className='bg-slate-100 shadow-sm p-2'><span className='font-medium'>Basic:</span> {parseFloat(user?.basic_salary).toLocaleString()} Tk.</p>

                                                        </div>
                                                    </div>
                                                </React.Fragment>)
                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <h3 className='text-center my-2 text-red-500 font-semibold'>Salary is not processed for this month, {months[selectedMonth - 1]}, {selectedYear}</h3>
                                </>
                        }
                    </>
            }
        </div>
    );
}

export default ProcessSalaryInfo;
