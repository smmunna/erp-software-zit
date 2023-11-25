<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SmsController extends Controller
{
    //Send SMS 
    public function sendSms(Request $req)
    {
        $message = $req->input('message');
        $phone = $req->input('phone');

        if ($phone) {
            $url = "http://sms.zaman-it.com/api/sendsms";
            $data = [
                [
                    "api_key" => "01959061004.8Jvs9hnNqe7woIuIAK",
                    "type" => "unicode",
                    "phone" => "88" . $phone,
                    "senderid" => "8809604903051",
                    "message" => $message,
                ]
            ];
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data[0]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            return $response = curl_exec($ch);
        }

        return ['status_code' => 200];
    }
}
