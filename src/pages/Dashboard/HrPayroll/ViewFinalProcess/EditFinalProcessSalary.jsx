import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../../api/secureApi';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import Swal from 'sweetalert2';
import api from '../../../../api/api';
import { ToastContainer, toast } from 'react-toastify';

const EditFinalProcessSalary = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();


    const navigate = useNavigate();

    useEffect(() => {
        secureApi.get(`/show-individualdata-idwise?id=${id}`)
            .then(res => {
                setData(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    // Form submission;
    const handleFormSubmission = (e) => {
        e.preventDefault()
        const form = e.target;
        const final_salary = parseFloat(form.final_salary.value);
        const advance = parseFloat(form.advance.value) | 0;
        const ta = parseFloat(form.ta.value) | 0;
        const bonus = parseFloat(form.bonus.value) | 0;

        // const main_advance = data.advance;
        // const main_ta = data.ta;
        // const main_bonus = data.bonus;

        // const advance_diff = advance - main_advance;
        const currentDate = new Date();
        const CurrentMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        const salaryInfo = {
            final_salary: final_salary
        };

        if (advance > 0) {
            salaryInfo.advance = advance;
            salaryInfo.final_salary = ((data.basic_salary / CurrentMonthDays) * (data.total_attendance + 1)) - advance + data.ta + data.bonus; // Subtract advance from final_salary
        }

        if (ta > 0) {
            salaryInfo.ta = ta;
            salaryInfo.final_salary += ((data.basic_salary / CurrentMonthDays) * (data.total_attendance + 1)) - data.advance + ta + data.bonus; // Add ta to final_salary
        }

        if (bonus > 0) {
            salaryInfo.bonus = bonus;
            salaryInfo.final_salary += ((data.basic_salary / CurrentMonthDays) * (data.total_attendance + 1)) - data.advance + data.ta + bonus; // Add bonus to final_salary
        }

        if (advance > 0 && ta > 0) {
            salaryInfo.advance = advance;
            salaryInfo.ta = ta;
            salaryInfo.final_salary = ((data.basic_salary / CurrentMonthDays) * (data.total_attendance + 1)) - advance + ta + data.bonus
        }

        if (advance > 0 && bonus > 0) {
            salaryInfo.advance = advance;
            salaryInfo.bonus = bonus;
            salaryInfo.final_salary = ((data.basic_salary / CurrentMonthDays) * (data.total_attendance + 1)) - advance + data.ta + bonus
        }

        if (ta > 0 && bonus > 0) {
            salaryInfo.ta = ta;
            salaryInfo.ta = bonus;
            salaryInfo.final_salary = ((data.basic_salary / CurrentMonthDays) * (data.total_attendance + 1)) + ta + bonus;
        }

        if (advance > 0 && ta > 0 && bonus > 0) {
            salaryInfo.advance = advance;
            salaryInfo.ta = ta;
            salaryInfo.ta = bonus;
            salaryInfo.final_salary = ((data.basic_salary / CurrentMonthDays) * (data.total_attendance + 1)) - advance + ta + bonus;
        }

        // console.log(salaryInfo);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Send data to server;
                // console.log(salaryInfo)
                api.patch(`/update-finale-salary?id=${id}`, salaryInfo)
                    .then(res => {
                        if (res.status == 'ok') {
                            navigate('/dashboard/view-salary-process')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

                toast.success('Updated Final Salary..')

            }
        });

    }

    return (
        <div className='min-h-screen'>
            <PageHeading title={`Update Salary`} />
            <div>
                <form onSubmit={handleFormSubmission}>
                    <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
                        <div>
                            <label className="label label-text">Final Salary:</label>
                            <input
                                type="text"
                                defaultValue={data?.final_salary}
                                name='final_salary'
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label label-text">Advance:</label>
                            <input
                                type="text"
                                defaultValue={0}
                                name='advance'
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label label-text">TA:</label>
                            <input
                                type="text"
                                defaultValue={0}
                                name='ta'
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label label-text">Bonus:</label>
                            <input
                                type="text"
                                defaultValue={0}
                                name='bonus'
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div className='md:mt-7'>
                            <button className='btn btn-primary my-2 w-full lg:w-52'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default EditFinalProcessSalary;
