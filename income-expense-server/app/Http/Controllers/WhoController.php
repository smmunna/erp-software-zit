<?php

namespace App\Http\Controllers;

use App\Models\Who;
use Illuminate\Http\Request;

class WhoController extends Controller
{
    // Insert who to db
    public function addWho(Request $request)
    {
        $name = $request->input("name");
        $who = new Who();
        $who->name = $name;
        $who->save();
        return ['status' => 'ok'];
    }

    // Get all who
    public function getAllWho()
    {
        $whoList = Who::all();
        return response()->json($whoList);
    }

    // Update who
    public function updateWho(Request $request)
    {
        $name = $request->input('name');
        $who = Who::find($request->input('id'));
        $who->name = $name;
        $who->save();
        return ['status' => 'ok'];
    }

    // Delete who
    public function deleteWho(Request $request)
    {
        $who = Who::find($request->query('id'));
        $who->delete();
        return ['status' => 'ok'];
    }
}
