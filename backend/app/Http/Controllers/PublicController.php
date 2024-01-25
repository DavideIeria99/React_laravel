<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PublicController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $responseMessage = "registration Successful";
        return response()->json([
            'data' => $user,
            'success' => true,
            'message' => $responseMessage
        ], 200);
    }

    public function login(Request $request)
    {
        //* per controllare che dati arrivano
        // var_dump($request->all());
        // return"";
        $validator = Validator::make($request->all(), [

            'email' => 'required|string|email ',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 400);
        }
        $credentials = $request->only(["email", "password"]);

        $user = User::where('email', $credentials['email'])->first();


        if ($user) {
            if (!auth()->attempt($credentials)) {
                $responseMessage = "invalid username or password";
                return response()->json([
                    "success" => false,
                    "message" => $responseMessage,
                    "error" => $responseMessage,
                ], 422);
            }
            $accessToken = auth()->user()->createToken('authToken')->accessToken;
            // funziona pure cosi: $accessToken = $user->createToken('authToken')->accessToken;
            $responseMessage = "login Successful";
            return response()->json([

                "success" => true,
                "message" => $responseMessage,
                "token" => $accessToken,
                "token_type" => "bearer",  //al portatore 
                "data" => auth()->user(),
            ], 200);
        } else {
            $responseMessage = "sorry, this user does not exist";

            return response()->json([
                "success" => false,
                "message" => $responseMessage,
                "error" => $responseMessage,
                "data" => auth()->user(),
            ], 422); //unprocessable entity 
        }
    }

    public function logout()
    {
        $user = Auth::guard('api')->user(); //devo essere autenticato

        if (!$user) {
            $responseMessage = "Invalid Bearer Token";

            return response()->json([
                "sussess" => false,
                "message" => $responseMessage,
                "error" => $responseMessage
            ], 403); //Forbidden
        }

        $token = $user->token();
        $token->revoke();

        $responseMessage = "successfully logged out";

        return response()->json([
            'success' => true,
            'message' => $responseMessage,
        ], 200);
    }

    //funzione per ricevere i commenti
    public function commentUsers()
    {
        $comment = Comment::all();

        $responseMessage = "comment profile";

        return response()->json([
            'success' => true,
            'message' => $responseMessage,
            'data' => $comment,
        ], 200);
    }
}
