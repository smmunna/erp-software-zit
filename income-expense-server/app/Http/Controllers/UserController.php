<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    // create new user;
    public function createUser(Request $request)
    {
        $name = $request->input("name");
        $email = $request->input("email");
        $password = $request->input("password");

        $existingUser = User::where('email', $email)->first();
        if ($existingUser) {
            return ['status' => 'user already exist'];
        } else {

            $user = new User();
            $user->name = $name;
            $user->email = $email;
            $user->password = Hash::make($password);
            $user->save();

            return ['status' => 'ok'];
        }
    }

    // update user;

    public function updateUser(Request $request)
    {
        $user = User::where('id', $request->query('id'))->first();

        if ($user) {
            $dataToUpdate = $request->only(['name', 'email', 'password', 'roles']);

            // Hash the password if it is included in the request
            if (isset($dataToUpdate['password'])) {
                $dataToUpdate['password'] = Hash::make($dataToUpdate['password']);
            }

            // Update only the specific fields provided in the request
            $user->update($dataToUpdate);

            return ['status' => 'ok'];
        } else {
            return ['status' => 'error'];
        }
    }

    // update password only
    public function updatePassword(Request $request)
    {
        $userId = $request->query('id');
        $newPassword = $request->input('password');

        // Hash the new password before updating the database
        $hashedPassword = Hash::make($newPassword);

        // Update the password for the user with the given ID
        User::where('id', $userId)->update(['password' => $hashedPassword]);

        return ['status' => 'ok'];
    }

    //delete user
    public function deleteUser(Request $request)
    {
        $user = User::where('id', $request->query('id'))->first();
        if ($user) {
            $user->delete();
            return ['status' => 'ok'];
        }
        return ['status' => 'data not found'];
    }

    //get individual user based on the id;
    public function getIndividualUser(Request $request)
    {
        $user = User::where('id', $request->query('id'))->first();
        return $user;
    }

    //user login
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {                             //|| !Hash::check($request->password, $user->password)
            return response([
                'message' => ['Invalid username/password']
            ], 404);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function getUser()
    {
        $user = User::all();
        return $user;
    }
}
