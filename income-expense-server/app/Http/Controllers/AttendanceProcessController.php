<?php

namespace App\Http\Controllers;

use App\Models\ProcessAttendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceProcessController extends Controller
{
    //add attendance 
    public function addAttendance(Request $request)
    {
        $date = $request->input("date");
        $existAttendance = ProcessAttendance::where("date", $date)->first();
        if ($existAttendance) {
            return ['status' => 'exist'];
        } else {

            $attendance_data = $request->input("data");
            foreach ($attendance_data as $data) {
                ProcessAttendance::create($data);
            }
            return ['status' => 'ok'];
        }
    }

    // Date wise attendance list;
    public function showAttendanceList(Request $request)
    {
        $date = $request->query('date');
        $attendanceList = ProcessAttendance::where('date', $date)->get();
        return $attendanceList;
    }

    // Update attendance
    public function updateAttendance(Request $request)
    {
        $name = $request->query('name');
        $date = $request->query('date');
        $attendance_status = $request->input('attendance_status');
        $attendanceData = ProcessAttendance::where(['name' => $name, 'date' => $date])->first();
        if ($attendanceData) {
            $attendanceData->attendance_status = $attendance_status;
            $attendanceData->save();
            return ['status' => 'ok'];
        } else {
            return ['status' => 'notok'];
        }
    }

    // show all attendance status by seeing month;

    public function getCurrentMonthAttendance(Request $request)
    {

        $currentMonth = $request->query('month');
        $currentYear = $request->query('year');

        $attendanceData = ProcessAttendance::select('name', 'date', 'attendance_status')
            ->whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->orderBy('date', 'asc')
            ->get();


        return $attendanceData;
    }


    // Join two tables salary setup and attendance Process
    public function joinSalaryAttendance(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');

        $data = DB::table('salary_setups')
            ->join('process_attendances', 'salary_setups.id', '=', 'process_attendances.emp_id')
            ->select(
                'salary_setups.name',
                'salary_setups.email',
                'salary_setups.basic_salary',
                'process_attendances.emp_id',
                DB::raw('SUM(CASE WHEN process_attendances.attendance_status = "present" THEN 1 ELSE 0 END) as total_present'),
                DB::raw('SUM(CASE WHEN process_attendances.attendance_status = "absent" THEN 1 ELSE 0 END) as total_absent'),
                DB::raw('SUM(CASE WHEN process_attendances.attendance_status = "half" THEN 1 ELSE 0 END) as total_half'),
                DB::raw('SUM(CASE WHEN process_attendances.attendance_status = "late" THEN 1 ELSE 0 END) as total_late'),
                DB::raw('SUM(CASE WHEN process_attendances.attendance_status = "overlate" THEN 1 ELSE 0 END) as total_overlate'),
                DB::raw($month . ' as month'),
                DB::raw($year . ' as year')
            )
            ->whereMonth('process_attendances.date', '=', $month)
            ->whereYear('process_attendances.date', '=', $year)
            ->groupBy(
                'process_attendances.emp_id',
                'salary_setups.name',
                'salary_setups.email',
                'salary_setups.basic_salary',
            )
            ->get();


        return $data;
    }
}
