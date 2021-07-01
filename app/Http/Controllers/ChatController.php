<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

    public function send(Request $request)
    {
        $user = User::find(Auth::id());

        $this->saveToSession($request);

        event(new ChatEvent($request->message, $user));

        return response()->json(["message" => "success", "chatMessage" => $request->message], 200);
    }

    public function saveToSession(Request $request)
    {
        session()->put('chat', $request->chat);
    }

    public function getOldMessages()
    {
        return response()->json(['chat' => session('chat')], 200);

    }
    public function  deleteSession()
    {
        session()->forget('chat');
    }

}
