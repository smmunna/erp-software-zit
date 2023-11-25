<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //insert controller to db
    public function addService(Request $request)
    {
        $title = $request->input("title");
        $service = new Service();
        $service->title = $title;
        $service->save();
        return ['status' => 'ok'];
    }

    // Get all services
    public function getAllService()
    {
        $service = Service::all();
        return response()->json($service);
    }

    // Update services
    public function updateService(Request $request)
    {
        $title = $request->input('title');
        $service = Service::find($request->input('id'));
        $service->title = $title;
        $service->save();
        return ['status' => 'ok'];
    }

    // Delete service
    public function deleteService(Request $request){
        $service = Service::find($request->query('id'));
        $service->delete();
        return ['status'=> 'ok'];
    }
}
