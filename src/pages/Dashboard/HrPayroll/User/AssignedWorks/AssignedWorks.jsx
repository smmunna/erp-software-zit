import React from 'react';
import PageHeading from '../../../../../components/Dashboard/PageHeading/PageHeading';

const AssignedWorks = ({ assigned_works, attendance, incomeList, loading }) => {

    // Define this function outside of your component
    function getStatusColor(attendanceStatus) {
        switch (attendanceStatus) {
            case 'present':
                return 'green'; // You can change this color as needed
            case 'absent':
                return 'red'; // You can change this color as needed
            case 'late':
                return 'orange'; // You can change this color as needed
            case 'half':
                return 'blue'; // You can change this color as needed
            case 'overlate':
                return 'red'; // You can change this color as needed
            default:
                return 'black'; // Default color
        }
    }

    // console.log(incomeList)
    function getStatusLabel(attendanceStatus) {
        const lowercaseStatus = attendanceStatus?.toLowerCase();

        switch (lowercaseStatus) {
            case 'present':
                return 'Present';
            case 'absent':
                return 'Absent';
            case 'late':
                return 'Late';
            case 'half':
                return 'Half';
            case 'overlate':
                return 'Over Late';
            default:
                return 'Unknown'; // You can change this label as needed
        }
    }

    return (
        <div>
            {
                loading ?
                    <>

                    </>
                    :
                    <>
                        <div className='my-4'>
                            <div className='bg-slate-50 shadow-md p-4'>
                                <PageHeading title={`Assigned Works`} />
                                {
                                    assigned_works.length > 0 ?
                                        <>
                                            <div className="overflow-x-auto w-[350px] md:w-full">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Service</th>
                                                            <th>Client</th>
                                                            <th>Marketing Person</th>
                                                            <th>Assigned Person</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* row 1 */}
                                                        {
                                                            assigned_works.map((assigned, index) => <React.Fragment key={index + 1}>
                                                                <tr>
                                                                    <th>{index + 1}</th>
                                                                    <td>{assigned?.service}</td>
                                                                    <td>{assigned?.client}</td>
                                                                    <td>{assigned?.marketing_person}</td>
                                                                    <td>{assigned?.assigned_person}</td>
                                                                    <td>{assigned?.date}</td>
                                                                </tr>
                                                            </React.Fragment>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <h3 className="text-red-500 text-center">No assigned works found..</h3>
                                        </>
                                }
                            </div>
                            <div className='my-4 bg-slate-50 shadow-md p-4'>
                                <PageHeading title={`Your Income`} />
                                {
                                    incomeList.length > 0 ?
                                        <>
                                            <div className="overflow-x-auto w-[350px] md:w-full">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Service</th>
                                                            <th>Client</th>
                                                            <th>Marketing Person</th>
                                                            <th>Assigned Person</th>
                                                            <th>Project value</th>
                                                            <th>Paid</th>
                                                            <th>Due</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* row 1 */}
                                                        {
                                                            incomeList.map((assigned, index) => <React.Fragment key={index + 1}>
                                                                <tr>
                                                                    <th>{index + 1}</th>
                                                                    <td>{assigned?.service}</td>
                                                                    <td>{assigned?.client}</td>
                                                                    <td>{assigned?.marketing_person}</td>
                                                                    <td>{assigned?.assigned_person}</td>
                                                                    <td>{parseFloat(assigned?.project_value).toLocaleString()}</td>
                                                                    <td>{assigned?.paid}</td>
                                                                    <td>{assigned?.due}</td>
                                                                    <td>{assigned?.date}</td>
                                                                </tr>
                                                            </React.Fragment>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <h3 className="text-red-500 text-center">No income hasbeen found..</h3>
                                        </>
                                }
                            </div>

                            <div className='my-4 bg-slate-50 shadow-md p-4'>
                                <PageHeading title={`Your attendance`} />
                                {
                                    attendance.length > 0 ?
                                        <>
                                            <div className="overflow-x-auto w-[350px] md:w-full">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Attendance status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* row 1 */}
                                                        {
                                                            attendance.map((assigned, index) => <React.Fragment key={index + 1}>
                                                                <tr>
                                                                    <td>{assigned?.date}</td>
                                                                    <td style={{ color: getStatusColor(assigned?.attendance_status) }}>
                                                                        {getStatusLabel(assigned?.attendance_status)}
                                                                    </td>
                                                                </tr>
                                                            </React.Fragment>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <h3 className="text-red-500 text-center">No attendance hasbeen found..</h3>
                                        </>
                                }
                            </div>

                        </div>
                    </>
            }
        </div>
    );
}

export default AssignedWorks;
