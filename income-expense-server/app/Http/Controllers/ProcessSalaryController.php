<?php

namespace App\Http\Controllers;

use App\Models\ProcessSalary;
use Illuminate\Http\Request;

class ProcessSalaryController extends Controller
{
    //process salary add to db;
    public function addProcessSalary(Request $request)
    {
        $month = $request->input("month");
        $year = $request->input("year");
        $data = $request->input("data");

        $existingMonth = ProcessSalary::where("month", $month)->first();
        $existingYear = ProcessSalary::where("year", $year)->first();

        if ($existingMonth && $existingYear) {
            return ['status' => 'exist'];
        } else {
            foreach ($data as $eachData) {
                ProcessSalary::create($eachData);
            }
            return ['status' => 'ok'];
        }
    }

    // View full salary list month and datewise;
    public function viewProcessedSalary(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');

        $data = ProcessSalary::where("month", $month)->where("year", $year)->get();

        return $data;
    }

    // View salary list by id wise;
    public function individualShowSalaryById(Request $request)
    {
        $id = $request->query("id");
        $data = ProcessSalary::where("id", $id)->first();
        return $data;
    }

    // Edit final salary for a user;
    public function updateIndividualSalary(Request $request)
    {
        $id = $request->query("id");
        $data = ProcessSalary::find($id);

        if ($data) {
            $patchData = $request->all();
            $data->update($patchData);

            return ["status" => "ok"];
        } else {
            return ["status" => "notok"];
        }

        // $data->update($request->all());
    }
}
