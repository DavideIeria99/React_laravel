<?php

use App\Http\Controllers\PublicController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'users', 'middleware' => 'CORS'], function ($router) {
    //pubbliche
    Route::post('/register', [PublicController::class, 'register'])->name('register.user');
    Route::post('/login', [PublicController::class, 'login'])->name('login.user');
    Route::get('/count', [UserController::class, 'countUsers'])->name('count.user');

    //comment
    Route::post('/comment/send', [UserController::class, 'commentSend'])->name('send.user');
    Route::get('/comment', [PublicController::class, 'commentUsers'])->name('comment.user');

    //privata
    Route::post('/view-profile', [UserController::class, 'viewProfile'])->name('profile.user');
    Route::get('/logout', [PublicController::class, 'logout'])->name('logout.user');

    //CRUD
    Route::put('/updateProfile', [UserController::class, 'updateProfile'])->name('update.profile');
    Route::put('/updateImage', [UserController::class, 'updateImage'])->name('update.image');
});
