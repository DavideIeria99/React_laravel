<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use Illuminate\Support\Str;
use App\Models\Comment;
use App\Models\User;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Throwable;

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
            'data' => $user,
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

    public function updateProfile(Request $request, User $user)
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


        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            // 'password' => $request->password
        ]);

        $responseMessage = "profile update";

        return response()->json([
            'success' => true,
            'message' => $responseMessage,
            'data' => $user,
        ], 200);
    }

    public function updateImage(UserRequest $request, User $user)
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

        if ($request->has("img")) {
            $path = public_path('storage/media');
            if (File::exists($path . $user->img)) {
                File::delete($path . $user->img);
            }

            $user_image = $request->file('img');
            $user_image_name = time() . '_' . 'user' . '_' . $user_image->getClientOriginalName();
            $user_image->storeAs('media/', $user_image_name, 'public');
            $user->update([
                'img' => $user_image_name
            ]);
        }

        $responseMessage = "image update";

        return response()->json([
            'success' => true,
            'message' => $responseMessage,
            'data' => $user_image_name
        ], 200);
    }

    public function deleteComment($id)
    {
        $user = Auth::guard('api')->user();
        if (!$user) {
            $responseMessage = "Invalid Bearer Token";

            return response()->json([
                "sussess" => false,
                "message" => $responseMessage,
                "error" => $responseMessage
            ], 403); //Forbidden
        }

        $comment = Comment::where('id', $id);

        $comment->delete();
        $responseMessage = "comment delete";

        return response()->json([

            'success' => true,
            'message' => $responseMessage,


        ], 200);
    }
}
