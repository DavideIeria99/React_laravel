<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class UserController extends Controller
{

    public function viewProfile()
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

        $responseMessage = "user profile";

        return response()->json([
            'success' => true,
            'message' => $responseMessage,
            'data' => $user
        ], 200);
    }

    public function countUsers()
    {
        return User::count();
    }

    //funzione per inviare i commenti
    public function commentSend(Request $request)
    {

        $comment = Comment::create([
            'user' => $request->user,
            'user_id' => $request->user_id,
            'message' => $request->message,
            'game' => $request->game,

        ]);
        if (!$comment) {
            $responseMessage = "no comment is";

            return response()->json([
                'data' => null,
                'success' => false,
                'message' => $responseMessage
            ], 403);
        }
        $responseMessage = "user comment success";

        return response()->json([
            'data' => $comment,
            'success' => true,
            'message' => $responseMessage
        ], 200);
    }
}
