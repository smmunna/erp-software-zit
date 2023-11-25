<?php

namespace App\Http\Controllers;

use App\Models\SalarySetup;
use Illuminate\Http\Request;

class SalarySetupController extends Controller
{
    //add salary setup
    public function addSalary(Request $request)
    {
        $existingSalary = SalarySetup::where("email", $request->email)->first();
        if ($existingSalary) {
            return ['status' => 'exist'];
        } else {
            SalarySetup::create($request->all());
            return ['status' => 'ok'];
        }
    }

    //show salaries...
    public function showSetupSalariesList(Request $request)
    {
        $salarySetup = SalarySetup::all();
        return $salarySetup;
    }

    //Update salary;
    public function editSalary(Request $request)
    {
        $salaryFind = SalarySetup::find($request->query('id'));
        if ($salaryFind) {
            $salaryFind->basic_salary = $request->basic_salary;
            $salaryFind->save();
            return ['status' => 'ok'];
        } else {
            return ['status' => 'notok'];
        }
    }

    // Delete salary;
    public function deleteSalary(Request $request)
    {
        $salarySetup = SalarySetup::where('id', $request->query('id'))->first();
        if ($salarySetup) {
            $salarySetup->delete();
            return ['status' => 'ok'];
        } else {
            return ['status' => 'notok'];
        }
    }
}
