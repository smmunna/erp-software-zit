<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    //
    // Insert payment method to db
    public function addPaymentMethod(Request $request)
    {
        $name = $request->input("name");
        $paymentMethod = new PaymentMethod();
        $paymentMethod->name = $name;
        $paymentMethod->save();
        return ['status' => 'ok'];
    }

    // Get all payment methods
    public function getAllPaymentMethods()
    {
        $paymentMethods = PaymentMethod::all();
        return response()->json($paymentMethods);
    }

    // Update payment method
    public function updatePaymentMethod(Request $request)
    {
        $name = $request->input('name');
        $paymentMethod = PaymentMethod::find($request->input('id'));
        $paymentMethod->name = $name;
        $paymentMethod->save();
        return ['status' => 'ok'];
    }

    // Delete payment method
    public function deletePaymentMethod(Request $request)
    {
        $paymentMethod = PaymentMethod::find($request->query('id'));
        $paymentMethod->delete();
        return ['status' => 'ok'];
    }
}
