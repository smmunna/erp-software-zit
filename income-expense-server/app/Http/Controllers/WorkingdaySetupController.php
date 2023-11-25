<?php

namespace App\Http\Controllers;

use App\Models\WorkingdaySetup;
use Illuminate\Http\Request;

class WorkingdaySetupController extends Controller
{
    //add working day's 
    public function addWorkingday(Request $request)
    {
        $findData = WorkingdaySetup::where("months", $request->months)->first();
        if ($findData) {
            return ['status' => 'notok'];
        } else {
            $workingday = WorkingdaySetup::create($request->all());
            return ['status' => 'ok'];
        }
    }

    // show working day's
    public function showWorkingdays(Request $request)
    {
        $workingdays = WorkingdaySetup::all();
        return $workingdays;
    }

    //Update days;
    public function editDays(Request $request)
    {
        $daysFind = WorkingdaySetup::find($request->query('id'));
        if ($daysFind) {
            $daysFind->days = $request->days;
            $daysFind->save();
            return ['status' => 'ok'];
        } else {
            return ['status' => 'notok'];
        }
    }

    //delete working day's
    public function deleteWorkingdays(Request $request)
    {
        $findData = WorkingdaySetup::find($request->query('id'));
        if ($findData) {
            $findData->delete();
            return ['status' => 'ok'];
        } else {
            return ['status' => 'notok'];
        }
    }
}
