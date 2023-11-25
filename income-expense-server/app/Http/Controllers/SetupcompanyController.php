<?php

namespace App\Http\Controllers;

use App\Models\CompanyInfo;
use Illuminate\Http\Request;

class SetupcompanyController extends Controller
{
    //company setup details update;
    public function updateCompanyInfo(Request $request)
    {
        $name = $request->input("name");
        $phone = $request->input("phone");
        $image = $request->file('image');

        // Generate a unique file name for the image
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        } else {
            $imageName = null;
        }

        $company = new CompanyInfo();
        $company->name = $name;
        $company->phone = $phone;
        $company->image = $imageName;

        $company->save();

        return ['info' => ['name' => $name, 'phone' => $phone]];
    }

    // Getting company info details;
    public function companydetails(Request $request)
    {
        $companyInfo = CompanyInfo::all();
        return $companyInfo;
    }

    // Update CompanyInfo
    public function latestUpdateInfo(Request $request)
    {
        $id = $request->input('id');
        $name = $request->input('name');
        $phone = $request->input('phone');

        $companyInfo = CompanyInfo::find($id);
        if (!$companyInfo) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        $companyInfo->name = $name;
        $companyInfo->phone = $phone;
        $companyInfo->save();

        return ['status' => 'ok'];
    }
}
