import React, { useEffect, useState } from 'react';
import secureApi from '../../../../api/secureApi';

const AttendanceComponent = () => {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await secureApi.get('/each-attendance');
                setAttendanceData(response);
                console.log(response)
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, []);


    return (
        <div className="flex flex-wrap">

        </div>
    );
};

export default AttendanceComponent;
