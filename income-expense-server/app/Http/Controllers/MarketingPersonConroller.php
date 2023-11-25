<?php

namespace App\Http\Controllers;

use App\Models\MarketingPerson;
use Illuminate\Http\Request;

class MarketingPersonConroller extends Controller
{
    //
    // Insert marketing person to db
    public function addMarketingPerson(Request $request)
    {
        $name = $request->input("name");
        $marketingPerson = new MarketingPerson();
        $marketingPerson->name = $name;
        $marketingPerson->save();
        return ['status' => 'ok'];
    }

    // Get all marketing persons
    public function getAllMarketingPersons()
    {
        $marketingPersons = MarketingPerson::all();
        return response()->json($marketingPersons);
    }

    // Update marketing person
    public function updateMarketingPerson(Request $request)
    {
        $name = $request->input('name');
        $marketingPerson = MarketingPerson::find($request->input('id'));
        $marketingPerson->name = $name;
        $marketingPerson->save();
        return ['status' => 'ok'];
    }

    // Delete marketing person
    public function deleteMarketingPerson(Request $request)
    {
        $marketingPerson = MarketingPerson::find($request->query('id'));
        $marketingPerson->delete();
        return ['status' => 'ok'];
    }
}
