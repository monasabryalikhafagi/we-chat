<?php

use App\User;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/chat', ['middleware' => "auth", function () {
    return view('chat');
}]);

Route::post('send', ['middleware' => "auth", "uses" => "ChatController@send"]);
Route::get('/get-old-message', ['middleware' => "auth", "uses" => "ChatController@getOldMessages"]);
Route::post('/save-to-session', ['middleware' => "auth", "uses" => "ChatController@saveToSession"]);
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/delete-session', 'ChatController@deleteSession');
Route::get('check', function () {
    return session()->get('chat');
});

//Route Model Binding
Route::get('users/{user}', function (User $user) {
    return $user;
});
