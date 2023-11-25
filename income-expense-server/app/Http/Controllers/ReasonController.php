<?php

namespace App\Http\Controllers;

use App\Models\Reason;
use Illuminate\Http\Request;

class ReasonController extends Controller
{
    // Insert reason to db
    public function addReason(Request $request)
    {
        $name = $request->input("name");
        $reason = new Reason();
        $reason->name = $name;
        $reason->save();
        return ['status' => 'ok'];
    }

    // Get all reasons
    public function getAllReasons()
    {
        $reasons = Reason::all();
        return response()->json($reasons);
    }

    // Update reason
    public function updateReason(Request $request)
    {
        $name = $request->input('name');
        $reason = Reason::find($request->input('id'));
        $reason->name = $name;
        $reason->save();
        return ['status' => 'ok'];
    }

    // Delete reason
    public function deleteReason(Request $request)
    {
        $reason = Reason::find($request->query('id'));
        $reason->delete();
        return ['status' => 'ok'];
    }
}
